import React, { useState, useRef } from "react";

interface ImageUploaderProps {
  onUploadImages: (images: File[]) => void;
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
  "tif",
  "tiff",
  "heic",
  "heif",
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

  const handleUploadImages = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const targetFiles = Array.from(files);

    if (!validateUploadedImages(targetFiles)) {
      alert(`${acceptedExt.join(", ")} 확장자의 파일만 추가할 수 있습니다.`);
      return;
    }

    onUploadImages(targetFiles);
  };

  const validateUploadedImages = (files: File[]) => {
    const isExistInvalidFile = files.some((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      return !acceptedExt.includes(ext);
    });

    return !isExistInvalidFile;
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
