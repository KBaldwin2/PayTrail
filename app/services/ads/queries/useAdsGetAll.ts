import { useQuery } from "react-query";
import { adsGet } from "../../../api/ads/adsGet";
import { IAd } from "../../../models/ad";
import { useRefetchOnFocus } from "../../utils/useRefetchOnFocus";
import { adKeys } from "../adKeys";

export const useAdsGetAll = () => {
  const {
    isLoading: isLoadingAds,
    data: ads,
    error: errorAds,
    refetch,
    isRefetching,
  } = useQuery<IAd[], string>(adKeys.adsGetAll(), adsGet);
  useRefetchOnFocus(refetch);

  return {
    isLoadingAds,
    ads,
    errorAds,
    refetch,
    isRefetching,
  };
};
