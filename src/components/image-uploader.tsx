import React, { useState } from "react";

const ImageUploader = () => {
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
        // TODO File Upload
      }}
    >
      <input id="image-upload" type="file" accept="image/*" hidden multiple />
      <p className="text-lg">이미지 업로드하기</p>
      <p>+</p>
    </label>
  );
};

export default ImageUploader;
