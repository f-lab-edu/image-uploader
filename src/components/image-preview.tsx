import { useEffect, useState } from "react";
interface ImagePreviewProps {
  image: File | null;
}

const ImagePreview = ({ image }: ImagePreviewProps) => {
  const [previewImgUrl, setPreviewImgUrl] = useState<string>("");

  useEffect(() => {
    if (image === null) {
      setPreviewImgUrl("");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImgUrl(reader.result);
        } else {
          alert("이미지를 읽는 데 실패했습니다.");
          console.warn("unexpected type from FileReader:", reader.result);
          setPreviewImgUrl("");
        }
      };
    }
  }, [image]);

  return (
    <div className="w-full">
      {image ? (
        <>
          <img
            src={previewImgUrl}
            alt={image.name}
            className="w-full aspect-[4/3] object-cover"
          />
          <p>{image.name}</p>
        </>
      ) : (
        <div className="w-full aspect-[4/3] bg-gray-200 flex justify-center items-center">
          <p>미리보기 이미지를 선택해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
