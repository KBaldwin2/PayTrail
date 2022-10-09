import { useMutation } from "react-query";
import {
  verifyResetPasswordOtp,
  VerifyResetPasswordOtpRequest,
} from "../../../api/users/verifyResetPasswordOtp";

export const useVerifyResetPasswordOtp = () => {
  return useMutation<string, Error, VerifyResetPasswordOtpRequest, string>(
    verifyResetPasswordOtp
  );
};
