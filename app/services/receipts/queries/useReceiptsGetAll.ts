import { useQuery } from "react-query";
import { receiptsGet } from "../../../api/receipts/receiptsGet";
import { IReceipt } from "../../../models/receipt";
import { useRefetchOnFocus } from "../../utils/useRefetchOnFocus";
import { receiptKeys } from "../receiptKeys";

export const useReceiptsGetAll = () => {
  const {
    isLoading: isLoadingReceipts,
    data: receipts,
    error: errorReceipts,
    refetch,
    isRefetching,
  } = useQuery<IReceipt[], string>(receiptKeys.receiptsGetAll(), receiptsGet);
  useRefetchOnFocus(refetch);

  return {
    isLoadingReceipts,
    receipts,
    errorReceipts,
    refetch,
    isRefetching,
  };
};
