import { ErrorResponse } from "../../../types";
import apiClient from "../client";

interface UpdateUserResponse {
  token: string;
}

export interface UpdateUserRequest {
  name: string;
}

export const updateUser = async (
  updateUserRequest: UpdateUserRequest
): Promise<string> => {
  const { ok, data } = await apiClient.put<UpdateUserResponse, ErrorResponse>(
    `/users`,
    updateUserRequest
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error((data as ErrorResponse).message || "Unable to Update User");
  }
  return (data as UpdateUserResponse).token ?? "";
};
