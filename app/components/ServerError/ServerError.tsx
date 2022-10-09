import { Alert, HStack, Text } from "native-base";
import React from "react";

interface IProps {
  message?: string | null;
}

export const ServerError = ({ message }: IProps) => {
  if (!message) {
    return null;
  }
  return (
    <Alert w="100%" status="error">
      <HStack space={4} flexShrink={1} alignItems="center">
        <Alert.Icon />
        <Text fontSize="md" color="coolGray.800">
          {message}
        </Text>
      </HStack>
    </Alert>
  );
};
