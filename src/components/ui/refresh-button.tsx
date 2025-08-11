import Button, { type IconButtonProps } from "../common/icon-button";
import RefreshIcon from "../../assets/icon-refresh.svg?react";

type RefreshButtonProps = Omit<IconButtonProps, "icon">;

const RefreshButton = ({ onClick, size }: RefreshButtonProps) => {
  return <Button icon={<RefreshIcon />} onClick={onClick} size={size} />;
};

export default RefreshButton;
