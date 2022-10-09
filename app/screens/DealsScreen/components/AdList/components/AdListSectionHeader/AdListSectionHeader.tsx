import { Avatar, Box, Flex, Text } from "native-base";
import { useEffect, useState } from "react";

interface IProps {
  store: string;
}

const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length === 1) {
    return `${parts[0].charAt(0)}${parts[0].charAt(parts[0].length)}`;
  } else if (parts.length >= 2) {
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  }
};

const COLORS = ["primary", "blue", "purple", "yellow", "red", "cyan", "orange"];

export const AdListSectionHeader = ({ store }: IProps) => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    setColor(COLORS[Math.floor(Math.random() * 7)]);
  }, []);

  return (
    <Flex
      backgroundColor="warmGray.100"
      key={store}
      py={2}
      px={2}
      alignItems="center"
      flexDirection="row"
    >
      <Avatar size="sm" borderRadius="10px" mr={2} bgColor={`${color}.200`}>
        {getInitials(store)}
      </Avatar>
      <Text
        fontWeight="500"
        fontSize="13px"
        color="gray.800"
        textTransform="uppercase"
      >
        {store}
      </Text>
    </Flex>
  );
};
