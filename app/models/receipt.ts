import { IFileDetail } from "./fileDetail";
import { IReceiptCategory } from "./receiptCategory";

export interface IReceipt {
  id?: string;
  userId?: string;
  phoneNumber?: string;
  fileDetail?: IFileDetail;
  date: string;
  store?: string;
  total?: number;
  memo?: string;
  receiptCategoryId?: string;
  receiptCategory?: IReceiptCategory;
  hasWarranty: boolean;
  isLifetimeWarranty?: boolean;
  warrantyExpirationDate?: Date;
}
