import Button, { type ButtonProps } from "../common/button";
import RefreshIcon from "../../assets/icon-refresh.svg?react";

type RefreshButtonProps = Omit<ButtonProps, "icon">;

const RefreshButton = ({ onClick, size }: RefreshButtonProps) => {
  return <Button icon={<RefreshIcon />} onClick={onClick} size={size} />;
};

export default RefreshButton;
