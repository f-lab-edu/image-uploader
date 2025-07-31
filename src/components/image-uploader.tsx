const ImageUploader = () => {
  return (
    <label
      htmlFor="image-upload"
      className="p-16 bg-indigo-50 rounded-md w-full h-64 cursor-pointer hover:bg-indigo-100 transition-colors duration-300 ease-in-out flex flex-col justify-center items-center gap-1"
    >
      <input id="image-upload" type="file" accept="image/*" hidden multiple />
      <p className="text-lg">이미지 업로드하기</p>
      <p>+</p>
    </label>
  );
};

export default ImageUploader;
