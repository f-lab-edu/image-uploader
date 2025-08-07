import type { FileInfo } from "../types/file-types";
import DeleteButton from "./ui/delete-button";

interface UploadedImageListProps {
  images: FileInfo[];
  onSelectImage: (idx: number) => void;
  onDeleteImage: (idx: number) => void;
}

const UploadedImageList = ({
  images,
  onSelectImage,
  onDeleteImage,
}: UploadedImageListProps) => {
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {images.map((image, i) => (
          <li
            key={`image-${i}-${image.name}`}
            className="border-2 border-indigo-200 rounded-md hover:border-indigo-600 transition-colors duration-300 ease-in-out flex justify-start h-20 overflow-hidden"
          >
            <button
              onClick={() => onSelectImage(i)}
              className="w-[5rem] aspect-square"
            >
              <img src={image.url} className="w-full h-full object-cover" />
            </button>
            <div className="w-[calc(100%-5rem)] h-full shrink-0 p-4 flex gap-2 justify-between items-center">
              <button
                onClick={() => onSelectImage(i)}
                className="flex flex-col gap-1 justify-center items-start w-[calc(100%-28px)]"
              >
                <p className="text-md font-semibold w-full overflow-hidden text-ellipsis text-left">
                  {image.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {image.createdAt.toLocaleString()},{" "}
                  {Math.floor((image.size / (1024 * 1024)) * 100) / 100} MB
                </p>
              </button>
              <DeleteButton onClick={() => onDeleteImage(i)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedImageList;
