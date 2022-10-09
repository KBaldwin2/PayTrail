import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Actionsheet, AddIcon, Button, Icon, useDisclose } from "native-base";
import React, { useState } from "react";
import { BottomTabParamList, RootStackParamList } from "../../../types";

type homeScreenProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, "Home">,
  StackNavigationProp<RootStackParamList>
>;

export const ActionButton = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation<homeScreenProps>();

  return (
    <>
      <Button
        rounded="full"
        height="60px"
        width="60px"
        position="absolute"
        zIndex={99}
        bottom="35px"
        onPress={onOpen}
        alignSelf="center"
        borderColor="white"
        borderWidth="5px"
        backgroundColor="primary.800"
      >
        <AddIcon size="xs" color="white" />
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              navigation.navigate("ScanReceiptsScreen");
              onClose();
            }}
            startIcon={
              <Icon
                as={<Ionicons name="ios-scan" />}
                color="gray.700"
                mr={3}
                size={6}
              />
            }
          >
            Scan Receipt
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              navigation.navigate("Receipts", {
                screen: "AddReceiptsScreen",
                params: {
                  imgUri: undefined,
                  receipt: undefined,
                  initView: false,
                },
              });
              onClose();
            }}
            startIcon={
              <Icon
                as={<FontAwesome5 name="receipt" />}
                color="gray.700"
                mr={3}
                size={6}
              />
            }
          >
            Enter Receipt
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
