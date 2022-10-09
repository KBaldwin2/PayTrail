import { useMutation } from "react-query";
import { loginUser } from "../../../api/users/loginUser";

interface LoginProps {
  phoneNumber: string;
  password: string;
}

export const useLogin = () => {
  return useMutation<string, string, LoginProps, string>(
    ({ phoneNumber, password }) => loginUser(phoneNumber, password)
  );
};
