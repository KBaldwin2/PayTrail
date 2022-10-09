import { Checkbox, ICheckboxProps } from "native-base";

export type CheckboxControlProps = ICheckboxProps;

export const CheckboxControl = (props: CheckboxControlProps) => {
  return <Checkbox {...props} />;
};
