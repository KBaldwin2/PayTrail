import { ISwitchProps, Switch } from "native-base";

export type ToggleControlProps = ISwitchProps;

export const ToggleControl = (props: ToggleControlProps) => {
  return <Switch {...props} />;
};
