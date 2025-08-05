import type { FileUploadInfo } from "../types/file-types";
import Progress from "./common/progress";

interface UploadImageStatusBoxProps {
  info: FileUploadInfo;
}

const UploadImageStatusBox = ({ info }: UploadImageStatusBoxProps) => {
  return (
    <div className="rounded-md bg-white border-2 border-gray-200 px-4 py-3 flex gap-2 flex-col">
      <div className="flex justify-start items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full text-xs ${
            info.status === "end"
              ? "bg-emerald-500"
              : info.status === "error"
              ? "bg-red-500"
              : "bg-amber-500"
          }`}
        ></span>
        <p className="text-gray-800">{info.name}</p>
        <p className="text-gray-500 ml-auto text-sm">
          {(info.loadedSize / info.totalSize) * 100}%
        </p>
      </div>
      <Progress value={info.loadedSize} max={info.totalSize} />
    </div>
  );
};

export default UploadImageStatusBox;
