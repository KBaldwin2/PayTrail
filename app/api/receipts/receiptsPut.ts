import apiClient from "../client";

export interface IUpdateReceipt {
  id: string;
  date: Date;
  store?: string;
  memo?: string;
  total?: number;
  receiptCategoryId?: string;
  hasWarranty?: boolean;
  warrantyExpirationDate?: Date;
  isLifetimeWarranty?: boolean;
}

export const receiptsPut = async (receipt: IUpdateReceipt): Promise<string> => {
  let body = {
    ...receipt,
    date: receipt.date.toISOString(),
  };
  const { ok, data } = await apiClient.put<string>(
    `/receipts/${receipt.id}`,
    body
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(data);
  }
  return data ?? "";
};
