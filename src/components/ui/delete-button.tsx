import Button, { type IconButtonProps } from "../common/icon-button";
import DeleteIcon from "../../assets/icon-delete.svg?react";

type DeleteButtonProps = Omit<IconButtonProps, "icon">;

const DeleteButton = ({ onClick, size }: DeleteButtonProps) => {
  return <Button icon={<DeleteIcon />} onClick={onClick} size={size} />;
};

export default DeleteButton;
