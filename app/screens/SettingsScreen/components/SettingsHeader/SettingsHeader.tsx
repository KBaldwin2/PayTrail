import { Heading, Text } from "native-base";
import React from "react";

interface IProps {
  title: string;
}

export const SettingsHeader = ({ title }: IProps) => {
  return (
    <Text
      fontSize="xs"
      fontWeight="500"
      color="gray.400"
      textTransform="uppercase"
    >
      {title}
    </Text>
  );
};
