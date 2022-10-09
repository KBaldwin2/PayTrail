import { useMutation } from "react-query";
import { deleteUser } from "../../../api/users/deleteUser";

export const useDeleteUser = () => {
  return useMutation<void, Error, void, void>(deleteUser);
};
