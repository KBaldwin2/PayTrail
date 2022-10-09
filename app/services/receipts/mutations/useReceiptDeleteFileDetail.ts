import { useMutation, useQueryClient } from "react-query";
import { receiptDeleteFileDetail } from "../../../api/receipts/receiptDeleteFileDetail";
import useAuth from "../../../hooks/useAuth";
import { IReceipt } from "../../../models/receipt";
import { receiptKeys } from "../receiptKeys";

export const useReceiptDeleteFileDetail = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<void, string, string, string>(receiptDeleteFileDetail, {
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<IReceipt[]>(
        receiptKeys.receiptsGetAll(),
        (prev = [] as IReceipt[]) => {
          return prev.map((x) => {
            if (x.id === variables) {
              x.fileDetail = undefined;
            }
            return x;
          });
        }
      );
    },
  });
};
