import { IReceipt } from "../../models/receipt";
import apiClient from "../client";

export const receiptsDelete = async (receiptId: string) => {
  const { ok } = await apiClient.delete<void>(`/receipts/${receiptId}`);

  if (!ok) {
    throw new Error("Failed to delete Receipt");
  }
};
