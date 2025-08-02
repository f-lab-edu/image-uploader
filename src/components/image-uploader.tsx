import React, { useState, useRef } from "react";
import type { FileInfo } from "../types/file-types";

interface ImageUploaderProps {
  onUploadImages: (images: FileInfo[]) => void;
  acceptedExt?: string[];
}

export const ACCEPTED_IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "ico",
];

const ImageUploader = ({
  onUploadImages,
  acceptedExt = ACCEPTED_IMAGE_EXTENSIONS,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const isActive = isHover || isDragOver;

  const handleDrag = (
    e: React.DragEvent<HTMLLabelElement>,
    status: boolean
  ) => {
    e.preventDefault();
    setIsDragOver(status);
  };

  const handleHover = (
    e: React.MouseEvent<HTMLLabelElement>,
    status: boolean
  ) => {
    e.preventDefault();
    setIsHover(status);
  };

  const handleUploadImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const originalFiles = Array.from(files);
    const validatedFiles = validateUploadedImages(originalFiles);

    if (validatedFiles.length === 0) {
      alert(
        `${acceptedExt.join(
          ", "
        )} 확장자의 파일만 추가할 수 있습니다.허용된 파일이 없습니다.`
      );
      return;
    } else if (validatedFiles.length !== originalFiles.length) {
      alert(
        `${acceptedExt.join(
          ", "
        )} 확장자의 파일만 추가할 수 있습니다. 허용되지 않는 파일은 제거되었습니다.`
      );
    }

    const result = await convertFileToBase64(validatedFiles);

    onUploadImages(result);
  };

  const convertFileToBase64 = async (files: File[]) => {
    const promises = files.map((file, i) => {
      return new Promise<FileInfo>((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadstart = (event) => {
          console.log(
            "[on start] state: ",
            reader.readyState,
            event.loaded,
            event.total,
            event.loaded / event.total
          );
        };

        reader.onprogress = (event) => {
          console.log(
            "[on progress] state: ",
            reader.readyState,
            event.loaded,
            event.total,
            event.loaded / event.total
          );
        };

        reader.onloadend = (event) => {
          console.log(
            "[finished] state: ",
            reader.readyState,
            event.loaded,
            event.total,
            (event.loaded / event.total) * 100
          );

          if (typeof reader.result === "string") {
            resolve({
              name: file.name,
              size: file.size,
              createdAt: new Date(),
              url: reader.result,
            });
          } else {
            reject(new Error("Unexpected result type from FileReader."));
          }
        };

        reader.onerror = () => reject(reader.error);

        reader.readAsDataURL(file);
      });
    });

    return Promise.all(promises);
  };

  const validateUploadedImages = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      return acceptedExt.includes(ext);
    });

    return validFiles;
  };

  const clearInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
  };

  return (
    <label
      htmlFor="image-upload"
      className={`p-16 bg-gray-100 rounded-md w-full h-64 cursor-pointer transition-colors duration-300 ease-in-out flex flex-col justify-center items-center gap-1 ${
        isActive && "bg-indigo-200"
      }`}
      onMouseEnter={(e) => {
        handleHover(e, true);
      }}
      onMouseLeave={(e) => {
        handleHover(e, false);
      }}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={(e) => {
        handleDrag(e, false);
        handleUploadImages(e.dataTransfer.files);
      }}
    >
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        hidden
        multiple
        ref={inputRef}
        onChange={(e) => {
          e.preventDefault();
          handleUploadImages(e.target.files);
          clearInput();
        }}
      />
      <p className="text-lg">이미지 업로드하기</p>
      <p>+</p>
    </label>
  );
};

export default ImageUploader;
