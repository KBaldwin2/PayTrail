import { ErrorResponse } from "../../../types";
import settings from "../../config/settings";
import apiClient from "../client";

interface CreateUserResponse {
  token: string;
}

export interface CreateUserRequest {
  name: string;
  phoneNumber: string;
  password: string;
}

export const createUser = async (
  createUserRequest: CreateUserRequest
): Promise<string> => {
  const { ok, data } = await apiClient.post<CreateUserResponse, ErrorResponse>(
    `/users`,
    createUserRequest
  );
  if (!ok) {
    // This could be a common pattern and written in the client
    throw new Error((data as ErrorResponse)?.message || "Unable to Register");
  }
  return (data as CreateUserResponse).token ?? "";
};
