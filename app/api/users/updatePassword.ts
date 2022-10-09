import { ErrorResponse } from "../../../types";
import apiClient from "../client";

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = async (
  updatePasswordRequest: UpdatePasswordRequest
): Promise<void> => {
  const { ok, data } = await apiClient.put<void, ErrorResponse>(
    `/users/updatePassword`,
    updatePasswordRequest
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(
      (data as ErrorResponse).message || "Unable to Update Password"
    );
  }
};
