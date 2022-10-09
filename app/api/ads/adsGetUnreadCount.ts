import { IAd } from "../../models/ad";
import apiClient from "../client";

export interface IReturn {
  count: number;
}

export const adsGetUnreadCount = async () => {
  const { ok, data } = await apiClient.get<IReturn>("/ads/unreadCount");

  if (!ok) {
    throw new Error("Failed to get Ads unread count");
  }
  return data ?? { count: 0 };
};
