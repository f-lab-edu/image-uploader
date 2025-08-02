interface UploadedImageListProps {
  images: File[];
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
      <ul className="flex gap-2 flex-wrap">
        {images.map((image, i) => (
          <li
            key={`image-${i}-${image.name}`}
            className="border-2 border-indigo-200 rounded-full px-2 py-1 hover:bg-indigo-200 transition-colors duration-300 ease-in-out flex gap-2"
          >
            <button onClick={() => onSelectImage(i)}>{image.name}</button>
            <button onClick={() => onDeleteImage(i)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedImageList;
