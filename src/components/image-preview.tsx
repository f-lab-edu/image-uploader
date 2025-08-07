import type { FileInfo } from "../types/file-types";
import RefreshButton from "./ui/refresh-button";
interface ImagePreviewProps {
  image: FileInfo | null;
  onRefresh: () => void;
}

const ImagePreview = ({ image, onRefresh }: ImagePreviewProps) => {
  return (
    <div className="w-full">
      {image ? (
        <div className="flex flex-col gap-2">
          <img
            src={image.url}
            alt={image.name}
            className="w-full aspect-[4/3] object-cover"
          />
          <div className="flex justify-between gap-2">
            <p className="text-gray-500 text-sm">{image.name}</p>
            <RefreshButton onClick={onRefresh} />
          </div>
        </div>
      ) : (
        <div className="w-full aspect-[4/3] bg-gray-100 flex justify-center items-center">
          <p>미리보기 이미지를 선택해주세요.</p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
