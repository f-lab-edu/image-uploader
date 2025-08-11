import type { FileInfo } from "../types/file-types";

export const handleFileOnLoadEnd = ({
  reader,
  file,
  onResolve,
  onReject,
}: {
  reader: FileReader;
  file: File;
  onResolve: (value: FileInfo | PromiseLike<FileInfo>) => void;
  onReject: (reason?: any) => void;
}) => {
  try {
    if (typeof reader.result === "string") {
      onResolve({
        url: reader.result,
        name: file.name,
        size: file.size,
        createdAt: new Date(),
      });
    } else {
      throw new Error("Unexpected result type from FileReader.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      onReject(error);
    } else {
      onReject(new Error("Unknown error occurred in FileReader onloadend."));
    }
  }
};
