interface UploadedImageListProps {
  images: File[];
  onSelectImage: (img: File) => void;
}

const UploadedImageList = ({
  images,
  onSelectImage,
}: UploadedImageListProps) => {
  return (
    <div>
      <ul className="flex gap-2 flex-wrap">
        {images.map((image) => (
          <li>
            <button
              onClick={() => onSelectImage(image)}
              className="border-2 border-indigo-200 rounded-full px-2 py-1 hover:bg-indigo-200 transition-colors duration-300 ease-in-out"
            >
              {image.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedImageList;
