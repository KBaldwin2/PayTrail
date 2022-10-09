import { useMutation } from "react-query";
import {
  resetPassword,
  ResetPasswordRequest,
} from "../../../api/users/resetPassword";

export const useResetPassword = () => {
  return useMutation<void, Error, ResetPasswordRequest, string>(resetPassword);
};
