import { ErrorResponse } from "../../../types";
import apiClient from "../client";

export interface SendOtpResponse {
  token: string | undefined;
}

export interface SendOtpRequest {
  phoneNumber: string; // phone number, email, etc.
}

export const sendOtp = async (
  sendOtpRequest: SendOtpRequest
): Promise<string | undefined> => {
  const { ok, data } = await apiClient.post<SendOtpResponse, ErrorResponse>(
    `/users/phoneNumberOtp`,
    sendOtpRequest
  );
  if (!ok) {
    throw new Error(
      (data as ErrorResponse).message || "Unable to Send Code at this time."
    );
  }
  return (data as SendOtpResponse).token;
};
