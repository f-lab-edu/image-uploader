import { useEffect, useState } from "react";
interface ImagePreviewProps {
  image: File;
}

const ImagePreview = ({ image }: ImagePreviewProps) => {
  const [previewImg, setPreviewImg] = useState<string>("");

  useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewImg(reader.result);
      } else {
        alert("이미지를 읽는 데 실패했습니다.");
        console.warn("unexpected type from FileReader:", reader.result);
        setPreviewImg("");
      }
    };
  }, [image]);

  return (
    <div className="w-full">
      <img
        src={previewImg ? previewImg : "/img_dummy.png"}
        alt={image.name}
        className="w-full aspect-[4/3] object-cover"
      />
      <p>{image.name}</p>
    </div>
  );
};

export default ImagePreview;
