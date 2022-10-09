import { useMutation } from "react-query";
import {
  sendResetPasswordOtp,
  SendResetPasswordOtpRequest,
} from "../../../api/users/sendResetPasswordOtp";

export const useSendResetPasswordOtp = () => {
  return useMutation<
    string | undefined,
    Error,
    SendResetPasswordOtpRequest,
    string
  >(sendResetPasswordOtp);
};
