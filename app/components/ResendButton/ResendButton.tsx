import React, { useState } from "react";
import { Button } from "native-base";
import useInterval from "../../hooks/useInterval";

interface IProps {
  onResend: () => void;
}

export const ResendButton = ({ onResend }: IProps) => {
  const [debounceCounter, setDebounceCounter] = useState<number>(0);

  useInterval(
    () => {
      setDebounceCounter((prev) => prev - 1);
    },
    debounceCounter > 0 ? 1000 : null
  );

  const onPress = () => {
    onResend();
    setDebounceCounter(10);
  };

  return (
    <Button
      variant="secondary"
      isDisabled={debounceCounter > 0}
      onPress={onPress}
    >
      {debounceCounter ? `Resend Code (${debounceCounter})` : `Resend Code`}
    </Button>
  );
};
