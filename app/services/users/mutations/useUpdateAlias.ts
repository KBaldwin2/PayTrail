import { useMutation } from "react-query";
import {
  updateAlias,
  UpdateAliasRequest,
} from "../../../api/users/updateAlias";

export const useUpdateAlias = () => {
  return useMutation<string, Error, UpdateAliasRequest, string>(updateAlias);
};
