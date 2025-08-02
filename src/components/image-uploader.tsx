import React, { useState, useRef } from "react";

interface ImageUploaderProps {
  onUploadImages: (images: File[]) => void;
}

const ImageUploader = ({ onUploadImages }: ImageUploaderProps) => {
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
    if (files && files.length > 0) {
      onUploadImages(Array.from(files));
    }
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
