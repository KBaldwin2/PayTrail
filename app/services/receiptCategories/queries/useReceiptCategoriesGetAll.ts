import { useQuery } from "react-query";
import { receiptCategoriesGet } from "../../../api/receiptCategories/receiptCategoriesGet";
import { IReceiptCategory } from "../../../models/receiptCategory";
import { useRefetchOnFocus } from "../../utils/useRefetchOnFocus";
import { receiptCategoriesKey } from "../receiptCategoryKeys";

export const useReceiptCategoriesGetAll = () => {
  const {
    isLoading: isLoadingReceiptCategories,
    data: receiptCategories,
    error: errorReceiptCategories,
    refetch,
  } = useQuery<IReceiptCategory[], string>(
    receiptCategoriesKey.receiptCategoriesGetAll(),
    receiptCategoriesGet
  );
  useRefetchOnFocus(refetch);

  return {
    isLoadingReceiptCategories,
    receiptCategories,
    errorReceiptCategories,
  };
};
