import { useMutation } from "react-query";
import { sendOtp, SendOtpRequest } from "../../../api/users/sendOtp";

export const useSendOtp = () => {
  return useMutation<string | undefined, Error, SendOtpRequest, string>(
    sendOtp
  );
};
