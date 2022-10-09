import { useMutation } from "react-query";
import { unsetPhone } from "../../../api/users/unsetPhone";

export const useUnsetPhone = () => {
  return useMutation<string, Error, void, string>(unsetPhone);
};
