import { useMutation } from "react-query";
import {
  updatePassword,
  UpdatePasswordRequest,
} from "../../../api/users/updatePassword";

export const useUpdatePassword = () => {
  return useMutation<void, Error, UpdatePasswordRequest, string>(
    updatePassword
  );
};
