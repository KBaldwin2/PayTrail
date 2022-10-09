import { Feather } from "@expo/vector-icons";
import { Icon, IInputProps, Input } from "native-base";
import React from "react";

interface ISearchInput extends IInputProps {}

export const SearchInput = (props: ISearchInput) => {
  return (
    <Input
      InputRightElement={
        <Icon
          as={<Feather name="search" />}
          size="xs"
          color="gray.500"
          mx={4}
        />
      }
      placeholder={props.placeholder || "Search"}
      size="md"
      backgroundColor="input.bgColor"
      {...props}
    />
  );
};
