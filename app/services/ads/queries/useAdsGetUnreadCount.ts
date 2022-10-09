import { useQuery } from "react-query";
import { adsGetUnreadCount } from "../../../api/ads/adsGetUnreadCount";
import { useRefetchOnFocus } from "../../utils/useRefetchOnFocus";
import { adKeys } from "../adKeys";

interface IReturn {
  count: number;
}

export const useAdsGetUnreadCount = () => {
  const {
    isLoading: isLoadingUnreadAdsCount,
    data: unreadAdsCount,
    error: errorUnreadAdsCount,
    refetch,
    isRefetching,
  } = useQuery<IReturn, string>(adKeys.adsGetUnreadCount(), adsGetUnreadCount);
  useRefetchOnFocus(refetch);

  return {
    isLoadingUnreadAdsCount,
    unreadAdsCount,
    errorUnreadAdsCount,
    refetch,
    isRefetching,
  };
};
