import { ErrorResponse } from "../../../types";
import apiClient from "../client";

interface VerifyPhoneNumberResponse {
  token: string;
}

export interface VerifyPhoneNumberRequest {
  phoneNumber: string;
  code: string;
}

export const verifyPhoneNumber = async (
  sendOtpRequest: VerifyPhoneNumberRequest
): Promise<string> => {
  const { ok, data } = await apiClient.post<
    VerifyPhoneNumberResponse,
    ErrorResponse
  >(`/users/verifyPhoneNumber`, sendOtpRequest);
  if (!ok) {
    throw new Error(
      (data as ErrorResponse).message || "Unable to verify code."
    );
  }
  return (data as VerifyPhoneNumberResponse).token ?? "";
};
