import { ErrorResponse } from "../../../types";
import apiClient from "../client";

interface LoginResponse {
  token: string;
}

export const loginUser = async (
  phoneNumber: string,
  password: string
): Promise<string> => {
  const { ok, data } = await apiClient.post<LoginResponse, ErrorResponse>(
    `/users/login`,
    {
      phoneNumber,
      password,
    }
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error((data as ErrorResponse).message || "Unable to login");
  }
  return (data as LoginResponse).token ?? "";
};
