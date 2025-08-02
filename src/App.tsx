import "./App.css";
import { useState } from "react";
import ImageUploader from "./components/image-uploader";
import UploadedImageList from "./components/uploaded-image-list";
import ImagePreview from "./components/image-preview";

function App() {
  const [previewImg, setPreviewImg] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSelectPreviewImage = (value: File | null) => {
    setPreviewImg(value);
  };

  const handleUploadImages = (images: File[]) => {
    setUploadedFiles([...uploadedFiles, ...images]);
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
        />
      </div>
      <ImagePreview image={previewImg} />
    </div>
  );
}

export default App;
