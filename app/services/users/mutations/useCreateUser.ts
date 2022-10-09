import { useMutation } from "react-query";
import { createUser, CreateUserRequest } from "../../../api/users/createUser";

export const useCreateUser = () => {
  return useMutation<string, Error, CreateUserRequest, string>(createUser);
};
