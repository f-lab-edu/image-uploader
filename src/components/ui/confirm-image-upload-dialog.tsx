import { useState, useEffect } from "react";
import Dialog from "../common/dialog";
import type { FileInfo } from "../../types/file-types";
import CheckIcon from "../../assets/icon-check.svg?react";

interface ConfirmImageUploadDialogProps {
  onClose: () => void;
  onUpload: (files: File[]) => void;
  files: File[];
}

const ConfirmImageUploadDialog = ({
  onClose,
  onUpload,
  files,
}: ConfirmImageUploadDialogProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const handleUploadImages = () => {
    const filesToUpload = files.filter((_, i) => selectedFiles.includes(i));
    onUpload(filesToUpload);
    onClose();
  };

  const getFileInfo = (file: File): Promise<FileInfo> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        try {
          if (typeof reader.result === "string") {
            resolve({
              url: reader.result,
              name: file.name,
              size: file.size,
              createdAt: new Date(),
            });
          } else {
            reject(new Error("Unexpected result type from FileReader."));
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            reject(error);
          } else {
            reject(
              new Error("Unknown error occurred in FileReader onloadend.")
            );
          }
        }
      };
      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(file);
    });
  };

  const selectFileToConfirm = (i: number) => {
    const newSelectedFiles = selectedFiles.includes(i)
      ? selectedFiles.filter((value) => value !== i)
      : [...selectedFiles, i];
    setSelectedFiles(newSelectedFiles);
  };

  useEffect(() => {
    if (files.length > 0) {
      const getFileInfos = async () => {
        try {
          const newFilesToConfirm = await Promise.all(files.map(getFileInfo));
          setUploadedFiles(newFilesToConfirm);
        } catch (error) {
          console.error("파일 변환 실패", error);
          setUploadedFiles([]);
        }
      };
      getFileInfos();
    }
  }, [files]);

  return (
    <Dialog onClose={onClose}>
      <div className="flex flex-col gap-2 w-full h-full">
        <h2 className="text-2xl font-bold">파일 선택하기</h2>
        <ul className="block flex flex-col gap-2 overflow-auto p-2 shrink-0 h-[calc(100%-100px)]">
          {uploadedFiles?.map((file, i) => (
            <li
              key={`confirm-image-${file.name}-${i}`}
              className="shrink-0 h-20"
            >
              <button
                className="border-2 border-gray-200 rounded-md hover:border-indigo-600 transition-colors duration-300 ease-in-out flex gap-2 justify-start items-center overflow-hidden w-full h-full"
                onClick={() => selectFileToConfirm(i)}
              >
                <div className="w-[5rem] aspect-square shrink-0">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center gap-2 w-full h-full px-2">
                  <div className="flex flex-col gap-1 justify-center items-start">
                    <p className="text-sm font-semibold w-full overflow-hidden text-ellipsis text-left">
                      {file.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {Math.floor((file.size / (1024 * 1024)) * 100) / 100} MB
                    </p>
                  </div>
                  <CheckIcon
                    className={`${
                      selectedFiles.includes(i)
                        ? "text-indigo-600"
                        : "text-gray-200"
                    }`}
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
        <button
          className="bg-indigo-400 text-white text-lg w-full py-3 rounded-md"
          onClick={handleUploadImages}
          disabled={selectedFiles.length === 0}
        >
          업로드하기
        </button>
      </div>
    </Dialog>
  );
};

export default ConfirmImageUploadDialog;
