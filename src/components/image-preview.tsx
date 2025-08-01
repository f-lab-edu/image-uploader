const ImagePreview = () => {
  return (
    <img 
      src={"/img_dummy.png"} 
      alt={"이미지 미리보기"} 
      style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
    />
  );
};

export default ImagePreview;
