import { ISpinnerProps, Spinner } from "native-base";
import React from "react";

export const LoadingIndicator = (props: ISpinnerProps) => {
  const { color = "primary.800", ...rest } = props;
  return <Spinner color={color} {...rest} />;
};
