const BUTTON_SIZE = {
  sm: "28",
  md: "36",
};

type IconButtonSizeType = keyof typeof BUTTON_SIZE;

export interface IconButtonProps {
  onClick: () => void;
  size?: IconButtonSizeType;
  icon: React.ReactElement;
}

const IconButton = ({ onClick, size = "sm", icon }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out`}
    >
      <icon.type width={BUTTON_SIZE[size]} height={BUTTON_SIZE[size]} />
    </button>
  );
};

export default IconButton;
