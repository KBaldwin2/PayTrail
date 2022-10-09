import { useMutation, useQueryClient } from "react-query";
import {
  IAddFile,
  receiptsAddFileDetail
} from "../../../api/receipts/receiptAddFileDetail";
import useAuth from "../../../hooks/useAuth";

export const useReceiptAddFileDetail = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<string, string, IAddFile, string>(receiptsAddFileDetail);
};
