import Button, { type ButtonProps } from "../common/button";
import DeleteIcon from "../../assets/delete-icon.svg?react";

type DeleteButtonProps = Omit<ButtonProps, "icon">;

const DeleteButton = ({ onClick, size }: DeleteButtonProps) => {
  return <Button icon={<DeleteIcon />} onClick={onClick} size={size} />;
};

export default DeleteButton;
