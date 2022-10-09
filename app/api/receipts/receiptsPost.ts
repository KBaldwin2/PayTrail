import apiClient from "../client";

export interface ICreateReceipt {
  fileDetail?: string | undefined;
  date?: Date;
  store?: string;
  memo?: string;
  total?: number;
  receiptCategoryId?: string;
  hasWarranty?: boolean;
  warrantyExpirationDate?: Date;
  isLifetimeWarranty?: boolean;
}

export const receiptsPost = async (
  receipt: ICreateReceipt
): Promise<string> => {
  var bodyFormData = new FormData();
  bodyFormData.append(
    "date",
    receipt.date
      ? new Date(receipt.date).toISOString()
      : new Date().toISOString()
  );
  bodyFormData.append("store", receipt.store || "");
  bodyFormData.append("total", "" + (receipt.total || 0));
  bodyFormData.append("receiptCategoryId", receipt.receiptCategoryId || "");
  bodyFormData.append("memo", receipt.memo || "");
  if (receipt.fileDetail) {
    bodyFormData.append("image", {
      // @ts-ignore
      uri: receipt.fileDetail,
      type: "image/jpeg",
      name: "image.jpeg",
    });
  }

  const { ok, data } = await apiClient.post<string>("/receipts", bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(data);
  }
  return data ?? "";
};
