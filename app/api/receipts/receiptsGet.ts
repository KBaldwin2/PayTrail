import { IReceipt } from "../../models/receipt";
import apiClient from "../client";

export const receiptsGet = async () => {
  const { ok, data } = await apiClient.get<IReceipt[]>("/receipts");

  if (!ok) {
    throw new Error("Failed to get Receipts");
  }
  return data ?? [];
};
