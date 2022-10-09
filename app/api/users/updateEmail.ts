import { ErrorResponse } from "../../../types";
import apiClient from "../client";

interface UpdateEmailResponse {
  token: string;
}

export interface UpdateEmailRequest {
  emailAddress: string;
  acceptMarketing: boolean;
}

export const updateEmail = async (
  updateUserRequest: UpdateEmailRequest
): Promise<string> => {
  const { ok, data } = await apiClient.put<UpdateEmailResponse, ErrorResponse>(
    `/users/updateEmail`,
    updateUserRequest
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(
      (data as ErrorResponse).message || "Unable to Update Email Address"
    );
  }
  return (data as UpdateEmailResponse).token ?? "";
};
