import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Flex, Stack } from "native-base";
import * as React from "react";
import { Animated } from "react-native";
import { ReceiptsParamList } from "../../../types";
import { IReceipt } from "../../models/receipt";
import { ReceiptList } from "./components/ReceiptList/ReceiptList";

type receiptsScreenProps = StackNavigationProp<
  ReceiptsParamList,
  "ReceiptsScreen"
>;

export default function ReceiptsScreen() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<receiptsScreenProps>();

  const onAddReceipt = () => {
    navigation.navigate("AddReceiptsScreen", {
      imgUri: undefined,
      receipt: undefined,
      initView: false,
    });
  };

  const onViewReceipt = (receipt: IReceipt) => {
    navigation.navigate("AddReceiptsScreen", {
      imgUri: undefined,
      receipt,
      initView: true,
    });
  };

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View // Special animatable View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [
          {
            translateX: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            }),
          },
        ],
      }}
    >
      <Stack
        backgroundColor="white"
        pt={4}
        height="100%"
        space={8}
        display="flex"
      >
        <Flex flex={1}>
          <ReceiptList
            onViewReceipt={onViewReceipt}
            onAddReceipt={onAddReceipt}
          />
        </Flex>
      </Stack>
    </Animated.View>
  );
}
