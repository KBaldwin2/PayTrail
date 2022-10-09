import React, { useState } from "react";
import { SetupStep } from "./SetupStep";
import { VerifyStep } from "./VerifyStep";

enum VerifyStepEnum {
  SETUP,
  VERIFY,
}

interface IProps {
  onSuccess: () => void;
}

export const QrSetUp = ({ onSuccess }: IProps) => {
  const [step, setStep] = useState<VerifyStepEnum>(VerifyStepEnum.SETUP);
  const [token, setToken] = useState<string | undefined>(undefined); // Only in Dev
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  if (step === VerifyStepEnum.SETUP) {
    return (
      <SetupStep
        onSuccess={(phoneNumber: string, token: string | undefined) => {
          setPhoneNumber(phoneNumber);
          setToken(token);
          setStep(VerifyStepEnum.VERIFY);
        }}
      />
    );
  } else {
    return (
      <VerifyStep
        onBack={() => {
          setPhoneNumber("");
          setToken("");
          setStep(VerifyStepEnum.SETUP);
        }}
        token={token}
        phoneNumber={phoneNumber}
        onSuccess={onSuccess}
      />
    );
  }
};
