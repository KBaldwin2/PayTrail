import { ErrorResponse } from "../../../types";
import apiClient from "../client";

interface UnsetPhoneResponse {
  token: string;
}

export const unsetPhone = async (): Promise<string> => {
  const { ok, data } = await apiClient.post<UnsetPhoneResponse, ErrorResponse>(
    `/users/unsetPhone`
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error(
      (data as ErrorResponse).message || "Unable to Delete Phone Number"
    );
  }
  return (data as UnsetPhoneResponse).token ?? "";
};
