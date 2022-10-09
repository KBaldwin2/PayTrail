import { IInputProps, Input } from "native-base";
import React from "react";

export type IInputControlProps = IInputProps & {};

export const InputControl = (props: IInputProps) => {
  return <Input variant="filled" {...props} />;
};
