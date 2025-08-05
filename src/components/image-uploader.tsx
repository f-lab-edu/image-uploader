import React, { useState, useRef } from "react";
import type { FileInfo, FileUploadInfo } from "../types/file-types";
import UploadImageStatusBox from "./upload-image-status-box";
import ConfirmImageUploadDialog from "./ui/confirm-image-upload-dialog";
import { sleep } from "../utils/sleep";
import { ACCEPTED_IMAGE_EXTENSIONS } from "../constants";

interface ImageUploaderProps {
  onUploadImages: (images: FileInfo[]) => void;
  acceptedExt?: string[];
}

const ImageUploader = ({
  onUploadImages,
  acceptedExt = ACCEPTED_IMAGE_EXTENSIONS,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileUploadInfosRef = useRef<FileUploadInfo[]>([]);
  const [fileUploadInfos, setFileUploadInfos] = useState<FileUploadInfo[]>([]);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const isActive = isHover || isDragOver;

  const [filesToConfirm, setFilesToConfirm] = useState<File[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

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

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setFilesToConfirm([]);
  };

  const handleImagesToConfirm = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const originalFiles = Array.from(files);
    const validatedFiles = validateUploadedImages(originalFiles);

    if (validatedFiles.length === 0) {
      alert(
        `${acceptedExt.join(
          ", "
        )} 확장자의 파일만 추가할 수 있습니다. 허용된 파일이 없습니다.`
      );
      return;
    } else if (validatedFiles.length !== originalFiles.length) {
      alert(
        `${acceptedExt.join(
          ", "
        )} 확장자의 파일만 추가할 수 있습니다. 허용되지 않는 파일은 제거되었습니다.`
      );
    }

    setFilesToConfirm([...validatedFiles]);
    setOpenConfirmDialog(true);
  };

  const handleUploadImages = async (files: File[]) => {
    fileUploadInfosRef.current = files.map((file) => ({
      name: file.name,
      loadedSize: 0,
      totalSize: file.size,
      status: "progress",
    }));
    setFileUploadInfos([...fileUploadInfosRef.current]);

    try {
      const result = await convertFileToBase64(files);
      await sleep(500);
      onUploadImages(result);
    } finally {
      setFileUploadInfos([]);
    }
  };

  const updateFileUploadStatus = async (
    event: ProgressEvent<FileReader>,
    file: File,
    index: number
  ) => {
    const newUploadInfo: FileUploadInfo = {
      name: file.name,
      loadedSize: event.loaded,
      totalSize: event.total,
      status: event.target?.readyState === 2 ? "end" : "progress",
    };

    const newFileUploadInfos = fileUploadInfosRef.current.map((prev, i) =>
      i === index ? newUploadInfo : prev
    );
    fileUploadInfosRef.current = newFileUploadInfos;
    await sleep(200);
    setFileUploadInfos(newFileUploadInfos);
  };

  const convertFileToBase64 = async (files: File[]) => {
    const promises = files.map((file, i) => {
      return new Promise<FileInfo>((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadstart = async (event) =>
          await updateFileUploadStatus(event, file, i);

        reader.onprogress = async (event) => {
          await updateFileUploadStatus(event, file, i);
        };

        reader.onloadend = async (event) => {
          await updateFileUploadStatus(event, file, i);

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
    <>
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
          handleImagesToConfirm(e.dataTransfer.files);
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
            handleImagesToConfirm(e.target.files);
            clearInput();
          }}
        />
        <p className="text-lg">이미지 업로드하기</p>
        <p>+</p>
      </label>
      <div className="fixed bottom-10 right-10 w-200 flex flex-col gap-2">
        {fileUploadInfos?.map((file, i) => (
          <UploadImageStatusBox
            key={`uploading-file-${i}-${file.name}`}
            info={file}
          />
        ))}
      </div>
      {openConfirmDialog && (
        <ConfirmImageUploadDialog
          files={filesToConfirm}
          onClose={handleCloseConfirmDialog}
          onUpload={handleUploadImages}
        />
      )}
    </>
  );
};

export default ImageUploader;
