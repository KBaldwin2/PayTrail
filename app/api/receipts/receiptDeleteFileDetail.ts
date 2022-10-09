import { IReceipt } from "../../models/receipt";
import apiClient from "../client";

export const receiptDeleteFileDetail = async (receiptId: string) => {
  const { ok } = await apiClient.delete<void>(`/receipts/${receiptId}/fileDetail`);

  if (!ok) {
    throw new Error("Failed to get Receipts");
  }
};
