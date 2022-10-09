import { useMutation } from "react-query";
import { updateUser, UpdateUserRequest } from "../../../api/users/updateUser";

export const useUpdateUser = () => {
  return useMutation<string, Error, UpdateUserRequest, string>(updateUser);
};
