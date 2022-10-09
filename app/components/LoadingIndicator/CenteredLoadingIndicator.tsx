import { Center, ISpinnerProps, Spinner } from "native-base";
import React from "react";
import { LoadingIndicator } from "./LoadingIndicator";

export const CenteredLoadingIndicator = (props: ISpinnerProps) => {
  return (
    <Center flex={1}>
      <LoadingIndicator {...props} />
    </Center>
  );
};
