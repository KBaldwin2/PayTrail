import apiClient from "../client";

export const adsMoveToReceipt = async (adId: string): Promise<void> => {
  const { ok, data } = await apiClient.post<string>(
    `/ads/${adId}/convertToReceipt`
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(data);
  }
};
