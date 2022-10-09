import { useMutation, useQueryClient } from "react-query";
import { adsMoveToReceipt } from "../../../api/ads/adsMoveToReceipt";
import { IAd } from "../../../models/ad";
import { adKeys } from "../adKeys";

export const useAdsMoveToReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation<void, string, string, string>(adsMoveToReceipt, {
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<IAd[]>(
        adKeys.adsGetAll(),
        (prev = [] as IAd[]) => [...prev.filter((x) => x.id !== variables)]
      );
    },
  });
};
