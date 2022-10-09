import { IReceiptCategory } from "../../models/receiptCategory";
import apiClient from "../client";

export const receiptCategoriesGet = async () => {
  const { ok, data } = await apiClient.get<IReceiptCategory[]>(
    "/receiptCategories"
  );

  if (!ok) {
    throw new Error("Failed to get Receipt Categories");
  }
  return data ?? [];
};
