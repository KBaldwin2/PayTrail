export interface IFileDetail {
  id?: string;
  fileName?: string;
  filePath?: string;
  mimeType?: string;
  size?: number;
  fileCategory: FileCategoryEnum;
}

export enum FileCategoryEnum {
  IMAGE = "IMAGE",
  HTML = "HTML",
  PDF = "PDF",
}
