import { IButtonProps as NBButtonProps, Button as NBButton } from "native-base";

export type IButtonProps = NBButtonProps & {
  children: React.ReactNode;
  onPress: () => void;
  width?: string;
};

export const Button = (props: IButtonProps) => {
  const { size = "lg", ...rest } = props;
  return <NBButton size={size} {...rest} />;
};
