import { Platform } from "react-native";
import apiClient from "../client";

export interface IAddFile {
  fileDetail: string;
  id: string;
}

export const receiptsAddFileDetail = async (
  addFile: IAddFile
): Promise<string> => {
  var bodyFormData = new FormData();
  if (addFile.fileDetail) {
    bodyFormData.append("image", {
      // @ts-ignore
      uri: addFile.fileDetail,
      type: "image/jpeg",
      name: "image.jpeg",
    });
  }

  const { ok, data } = await apiClient.post<string>(
    `/receipts/${addFile.id}/fileDetail`,
    bodyFormData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(data);
  }
  return data ?? "";
};
