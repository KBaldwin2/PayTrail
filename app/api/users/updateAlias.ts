import { ErrorResponse } from "../../../types";
import apiClient from "../client";

interface UpdateAliasResponse {
  token: string;
}

export interface UpdateAliasRequest {
  alias: string;
}

export const updateAlias = async (
  updateUserRequest: UpdateAliasRequest
): Promise<string> => {
  const { ok, data } = await apiClient.put<UpdateAliasResponse, ErrorResponse>(
    `/users/updateAlias`,
    updateUserRequest
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(
      (data as ErrorResponse).message || "Unable to Update Alias"
    );
  }
  return (data as UpdateAliasResponse).token ?? "";
};
