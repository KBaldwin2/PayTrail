import { ErrorResponse } from "../../../types";
import apiClient from "../client";

export interface SendResetPasswordOtpResponse {
  token: string | undefined;
}

export interface SendResetPasswordOtpRequest {
  emailAddress: string; // phone number, email, etc.
}

export const sendResetPasswordOtp = async (
  sendResetPasswordOtpRequest: SendResetPasswordOtpRequest
): Promise<string | undefined> => {
  const { ok, data } = await apiClient.post<
    SendResetPasswordOtpResponse,
    ErrorResponse
  >(`/users/resetPasswordOtp`, sendResetPasswordOtpRequest);
  if (!ok) {
    throw new Error(
      (data as ErrorResponse).message || "Unable to Send Code at this time."
    );
  }
  return (data as SendResetPasswordOtpResponse).token;
};
