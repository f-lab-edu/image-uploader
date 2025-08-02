import type { FileInfo } from "../types/file-types";
interface ImagePreviewProps {
  image: FileInfo | null;
}

const ImagePreview = ({ image }: ImagePreviewProps) => {
  return (
    <div className="w-full">
      {image ? (
        <>
          <img
            src={image.url}
            alt={image.name}
            className="w-full aspect-[4/3] object-cover"
          />
          <p className="text-gray-500 text-sm">{image.name}</p>
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
