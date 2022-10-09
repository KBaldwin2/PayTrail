import { StackScreenProps } from "@react-navigation/stack";
import { ChevronLeftIcon, Flex } from "native-base";
import React, { useCallback, useState } from "react";
import { AuthTabParamList } from "../../../types";
import { Button } from "../../components/Button";
import Screen from "../../components/Screen";
import { useResetPassword } from "../../services/users/mutations/useResetPassword";
import { useSendResetPasswordOtp } from "../../services/users/mutations/useSendResetPasswordOtp";
import { useUpdatePassword } from "../../services/users/mutations/useUpdatePassword";
import { useVerifyResetPasswordOtp } from "../../services/users/mutations/useVerifyResetPasswordOtp";
import { RequestResetForm } from "./components/RequestResetForm";
import { ResetPasswordCode } from "./components/ResetPasswordCode";
import { SetNewPassword } from "./components/SetNewPassword";

enum StepEnum {
  RequestReset,
  ResetPassword,
  SetNewPassword,
}

export const ForgotPasswordScreen = ({
  navigation,
}: StackScreenProps<AuthTabParamList, "Forgot">) => {
  const [step, setStep] = useState(StepEnum.RequestReset);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string>("");
  const sendResetPasswordOtp = useSendResetPasswordOtp();
  const verifyResetPasswordOtp = useVerifyResetPasswordOtp();
  const resetPassword = useResetPassword();

  const onRequestResetPassword = useCallback(
    async ({ email }: { email: string }) => {
      setEmail(email);
      try {
        const code = await sendResetPasswordOtp.mutateAsync({
          emailAddress: email,
        });
        setCode(code);
        setStep(StepEnum.ResetPassword);
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  const onVerifyResetPasswordOtp = useCallback(
    async ({ code }: { code: string }) => {
      try {
        const token = await verifyResetPasswordOtp.mutateAsync({
          emailAddress: email,
          code,
        });
        setStep(StepEnum.SetNewPassword);
      } catch (err) {
        console.error(err);
      }
    },
    [email]
  );

  const onSetNewPassword = useCallback(
    async ({ password }: { password: string }) => {
      try {
        await resetPassword.mutateAsync({
          code: code!,
          password,
          emailAddress: email,
        });
        navigation.navigate("SignIn");
      } catch (err) {
        console.error(err);
      }
    },
    [email, code]
  );

  return (
    <Screen>
      {step === StepEnum.RequestReset && (
        <RequestResetForm
          onSubmit={onRequestResetPassword}
          isLoading={sendResetPasswordOtp.isLoading}
          error={sendResetPasswordOtp.error?.message}
          onBackToLogin={() => navigation.navigate("SignIn")}
        />
      )}
      {step === StepEnum.ResetPassword && (
        <>
          <Flex alignItems="flex-start">
            <Button
              onPress={() => {
                navigation.navigate("SignIn");
              }}
              colorScheme="blackish"
              variant="ghost"
              leftIcon={<ChevronLeftIcon color="black" />}
            >
              Back to Login
            </Button>
          </Flex>
          <ResetPasswordCode
            onBack={() => setStep(StepEnum.RequestReset)}
            onSubmit={onVerifyResetPasswordOtp}
            token={code}
            email={email}
            isLoading={verifyResetPasswordOtp.isLoading}
            error={verifyResetPasswordOtp.error?.message}
          />
        </>
      )}
      {step === StepEnum.SetNewPassword && (
        <SetNewPassword
          onSubmit={onSetNewPassword}
          isLoading={resetPassword.isLoading}
          error={resetPassword.error?.message}
        />
      )}
    </Screen>
  );
};
