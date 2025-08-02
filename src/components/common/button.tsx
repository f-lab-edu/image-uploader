const BUTTON_SIZE = {
  sm: "28",
  md: "36",
};

type ButtonSizeType = keyof typeof BUTTON_SIZE;

export interface ButtonProps {
  onClick: () => void;
  size?: ButtonSizeType;
  icon: React.ReactElement;
}

const Button = ({ onClick, size = "sm", icon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-gray-400 hover:text-gray-600 transition-colors duration-300 ease-in-out`}
    >
      <icon.type width={BUTTON_SIZE[size]} height={BUTTON_SIZE[size]} />
    </button>
  );
};

export default Button;
