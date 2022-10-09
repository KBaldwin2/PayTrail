import { useMutation, useQueryClient } from "react-query";
import { adsHasRead } from "../../../api/ads/adsHasRead";
import { IAd } from "../../../models/ad";
import { adKeys } from "../adKeys";

export const useAdsSetToRead = () => {
  const queryClient = useQueryClient();

  return useMutation<void, string, string, string>(adsHasRead, {
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<IAd[]>(
        adKeys.adsGetAll(),
        (prev = [] as IAd[]) => [
          ...prev.map((x) => {
            if (x.id === variables) {
              x.hasViewed = true;
            }
            return x;
          }),
        ]
      );

      queryClient.setQueryData<{ count: number }>(
        adKeys.adsGetUnreadCount(),
        (prev = { count: 1 }) => ({ count: prev.count - 1 })
      );
    },
  });
};
