import { useMutation, useQueryClient } from "react-query";
import { IUpdateReceipt, receiptsPut } from "../../../api/receipts/receiptsPut";
import useAuth from "../../../hooks/useAuth";
import { IReceipt } from "../../../models/receipt";
import { receiptKeys } from "../receiptKeys";

export const useReceiptsPut = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<string, string, IUpdateReceipt, string>(receiptsPut, {
    onSuccess: (data, variables, context) => {
      let receipt = {
        ...variables,
      } as IReceipt;

      queryClient.setQueryData<IReceipt[]>(
        receiptKeys.receiptsGetAll(),
        (prev = [] as IReceipt[]) => {
          return prev.map((x) => {
            if (x.id === receipt.id) {
              x = receipt;
            }
            return x;
          });
        }
      );
    },
  });
};
