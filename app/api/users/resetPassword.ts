import { ErrorResponse } from "../../../types";
import apiClient from "../client";

export interface ResetPasswordRequest {
  password: string;
  emailAddress: string;
  code: string;
}

export const resetPassword = async (
  resetPasswordRequest: ResetPasswordRequest
): Promise<void> => {
  const { ok, data } = await apiClient.put<void, ErrorResponse>(
    `/users/resetPassword`,
    resetPasswordRequest
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(
      (data as ErrorResponse)?.message || "Unable to Reset Password"
    );
  }
};
