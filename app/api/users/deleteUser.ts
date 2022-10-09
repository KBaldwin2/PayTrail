import { ErrorResponse } from "../../../types";
import apiClient from "../client";

export const deleteUser = async (): Promise<void> => {
  const { ok, data } = await apiClient.delete<void, ErrorResponse>(`/users`);
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error((data as ErrorResponse).message || "Unable to Delete User");
  }
};
