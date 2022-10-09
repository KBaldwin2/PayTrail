import { useMutation } from "react-query";
import {
  verifyPhoneNumber,
  VerifyPhoneNumberRequest,
} from "../../../api/users/verifyPhoneNumber";
import useAuth from "../../../hooks/useAuth";

export const useVerifyPhoneNumber = () => {
  const { setUser } = useAuth();
  return useMutation<string, Error, VerifyPhoneNumberRequest, string>(
    verifyPhoneNumber,
    {
      onSuccess: (data, variables, context) => {
        setUser(data);
      },
    }
  );
};
