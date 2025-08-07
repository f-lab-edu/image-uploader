import React from "react";
import IconButton from "../common/icon-button";
import ExitIcon from "../../assets/icon-exit.svg?react";

export interface DialogProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const Dialog = ({ onClose, children }: DialogProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.1)] flex justify-center items-center select-none">
      <div className="bg-white w-[80%] max-w-100 h-[70%] max-h-100 p-8 rounded-lg relative">
        <div className="absolute top-8 right-8">
          <IconButton icon={<ExitIcon />} onClick={onClose} size="md" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
