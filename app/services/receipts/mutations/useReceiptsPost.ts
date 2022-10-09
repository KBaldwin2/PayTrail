import { useMutation, useQueryClient } from "react-query";
import {
  ICreateReceipt,
  receiptsPost,
} from "../../../api/receipts/receiptsPost";
import useAuth from "../../../hooks/useAuth";
import { IReceipt } from "../../../models/receipt";
import { receiptKeys } from "../receiptKeys";

export const useReceiptsPost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<string, string, ICreateReceipt, string>(receiptsPost, {
    onSuccess: (data, variables, context) => {
      let receipt = {
        ...variables,
        id: data,
        userId: user?.id,
      } as IReceipt;

      queryClient.setQueryData<IReceipt[]>(
        receiptKeys.receiptsGetAll(),
        (prev = [] as IReceipt[]) => [...prev, receipt]
      );
    },
  });
};
