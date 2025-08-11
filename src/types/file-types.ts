export interface FileInfo {
  url: string;
  name: string;
  size: number;
  createdAt: Date;
}

export interface FileUploadInfo {
  name: string;
  loadedSize: number;
  totalSize: number;
  status: "progress" | "end" | "error";
}
