import { IFileDetail } from "./fileDetail";

export interface IAd {
  id?: string;
  title?: string;
  store?: string;
  fileDetailId?: string;
  fileDetail?: IFileDetail;
  receivedDate?: Date;
  hasViewed?: boolean;
  userId?: string;
}
