import { ChevronRightIcon, Flex, Text } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";

interface IProps {
  icon: JSX.Element;
  title: string;
  onPress: () => void;
}

export const SettingsMenuItem = ({ icon, title, onPress }: IProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Flex alignItems="center" flexDirection="row">
        {icon}
        <Text color="black" fontSize="sm" ml={3} flexGrow={1}>
          {title}
        </Text>
        <ChevronRightIcon color="gray.500" />
      </Flex>
    </TouchableOpacity>
  );
};
