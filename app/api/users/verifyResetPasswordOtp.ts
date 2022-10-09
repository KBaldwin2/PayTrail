import { ErrorResponse } from "../../../types";
import apiClient from "../client";

interface VerifyResetPasswordOtpResponse {
  token: string;
}

export interface VerifyResetPasswordOtpRequest {
  emailAddress: string;
  code: string;
}

export const verifyResetPasswordOtp = async (
  sendOtpRequest: VerifyResetPasswordOtpRequest
): Promise<string> => {
  const { ok, data } = await apiClient.post<
    VerifyResetPasswordOtpResponse,
    ErrorResponse
  >(`/users/verifyResetPasswordOtp`, sendOtpRequest);
  if (!ok) {
    throw new Error(
      (data as ErrorResponse).message || "Unable to verify code."
    );
  }

  return (data as VerifyResetPasswordOtpResponse).token ?? "";
};
