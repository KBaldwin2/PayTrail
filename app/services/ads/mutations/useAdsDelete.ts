import { useMutation, useQueryClient } from "react-query";
import { adsDelete } from "../../../api/ads/adsDelete";
import { IAd } from "../../../models/ad";
import { adKeys } from "../adKeys";

export const useAdsDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<void, string, string, string>(adsDelete, {
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<IAd[]>(
        adKeys.adsGetAll(),
        (prev = [] as IAd[]) => [...prev.filter((x) => x.id !== variables)]
      );
    },
  });
};
