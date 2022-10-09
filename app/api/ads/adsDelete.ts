import apiClient from "../client";

export const adsDelete = async (adsId: string) => {
  const { ok } = await apiClient.delete<void>(`/ads/${adsId}`);

  if (!ok) {
    throw new Error("Failed to delete Ad");
  }
};
