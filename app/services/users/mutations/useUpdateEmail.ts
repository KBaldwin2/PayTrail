import { useMutation } from "react-query";
import {
  updateEmail,
  UpdateEmailRequest,
} from "../../../api/users/updateEmail";

export const useUpdateEmail = () => {
  return useMutation<string, Error, UpdateEmailRequest, string>(updateEmail);
};
