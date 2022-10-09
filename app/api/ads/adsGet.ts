import { IAd } from "../../models/ad";
import apiClient from "../client";

export const adsGet = async () => {
  const { ok, data } = await apiClient.get<IAd[]>("/ads");

  if (!ok) {
    throw new Error("Failed to get Ads");
  }
  return data ?? [];
};
