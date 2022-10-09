import { useMutation, useQueryClient } from "react-query";
import { receiptsDelete } from "../../../api/receipts/receiptsDelete";
import { IReceipt } from "../../../models/receipt";
import { receiptKeys } from "../receiptKeys";

export const useReceiptsDelete = () => {
  const queryClient = useQueryClient();

  return useMutation<void, string, string, IReceipt[]>(
    "delete",
    receiptsDelete,
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(receiptKeys.receiptsGetAll());
        // Snapshot the previous value
        const previousReceipts = queryClient.getQueryData<IReceipt[]>(
          receiptKeys.receiptsGetAll()
        );

        // Optimistically update to the new value
        queryClient.setQueryData<IReceipt[]>(
          receiptKeys.receiptsGetAll(),
          (prev = [] as IReceipt[]) => [...prev.filter((x) => x.id !== id)]
        );

        // Return a context object with the snapshotted value
        return previousReceipts;
      },
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData<IReceipt[]>(
          receiptKeys.receiptsGetAll(),
          (prev = [] as IReceipt[]) => [
            ...prev.filter((x) => x.id !== variables),
          ]
        );
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData<IReceipt[]>(
          receiptKeys.receiptsGetAll(),
          context ?? []
        );
      },
    }
  );
};
