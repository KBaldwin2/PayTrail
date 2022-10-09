import apiClient from "../client";

export const adsHasRead = async (adsId: string) => {
  const { ok } = await apiClient.post<void>(`/ads/${adsId}/setToRead`);

  if (!ok) {
    throw new Error("Failed to set Ad to read");
  }
};
