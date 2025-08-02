import "./App.css";
import { useState } from "react";
import ImageUploader from "./components/image-uploader";
import UploadedImageList from "./components/uploaded-image-list";
import ImagePreview from "./components/image-preview";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedPreviewIdx, setSelectedPreviewIdx] = useState<number>(-1);

  const handleSelectPreviewImage = (idx: number) => {
    setSelectedPreviewIdx(idx);
  };

  const handleUploadImages = (images: File[]) => {
    setUploadedFiles([...uploadedFiles, ...images]);
  };

  const handleDeleteImages = (idx: number) => {
    if (idx === selectedPreviewIdx) {
      setSelectedPreviewIdx(-1);
    }

    const newUploadedFiles = uploadedFiles.filter((_, i) => i !== idx);
    setUploadedFiles(newUploadedFiles);
  };

  return (
    <div className="w-full h-full p-20 grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <ImageUploader
          onUploadImages={handleUploadImages}
          acceptedExt={["jpg", "jpeg"]}
        />
        <UploadedImageList
          images={uploadedFiles}
          onSelectImage={handleSelectPreviewImage}
          onDeleteImage={handleDeleteImages}
        />
      </div>
      <ImagePreview image={previewImg} />
    </div>
  );
}

export default App;
