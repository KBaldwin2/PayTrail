import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import { Box, Image, ScrollView, Stack, Text } from "native-base";
import * as React from "react";
import { useEffect } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { RootStackParamList } from "../../../types";
import { Button } from "../../components/Button";
import { ScanReceipt } from "./components/ScanReceipt";
import useStartCamera from "./hooks/useStartCamera";

type scanReceiptsScreenProps = StackNavigationProp<
  RootStackParamList,
  "ScanReceiptsScreen"
>;

type Props = StackScreenProps<RootStackParamList, "ScanReceiptsScreen">;
const width = Dimensions.get("window").width;

export default function ScanReceiptsScreen({ route }: Props) {
  const { receipt } = route.params || {};
  const { startCamera, showPermissionDenied } = useStartCamera();
  const navigation = useNavigation<scanReceiptsScreenProps>();

  useEffect(() => {
    startCamera();
  }, []);

  const onOpenAppSettings = () => {
    Linking.openSettings();
  };

  if (showPermissionDenied) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <Box pt="5%" px={4}>
            <Image
              height={width}
              alt="printing"
              source={require("./access_denied.png")}
            />
            <Box my={10}>
              <Text textAlign="center" fontWeight="700" fontSize="4xl">
                Permission needed
              </Text>
              <Text textAlign="center" mt={4}>
                You have not given camera permissions to this app. If you want
                to take pictures of your receipts, you will need to go into your
                app settings and give PayTrail camera access.
              </Text>
            </Box>
            <Stack space={4}>
              <Button onPress={onOpenAppSettings} variant="primary">
                Open Settings
              </Button>
              <Button onPress={() => navigation.goBack()} variant="ghost">
                Cancel
              </Button>
            </Stack>
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <ScanReceipt
      onCancel={() => navigation.goBack()}
      onUsePicture={(uri: string) => {
        navigation.navigate("Root", {
          screen: "Receipts",
          params: {
            screen: "AddReceiptsScreen",
            params: {
              imgUri: uri,
              receipt,
              initView: false,
            },
          },
        });
      }}
    />
  );
}
