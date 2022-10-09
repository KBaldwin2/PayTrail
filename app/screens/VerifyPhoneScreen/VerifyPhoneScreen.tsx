import { StackScreenProps } from "@react-navigation/stack";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import {
  Box,
  Center,
  ChevronLeftIcon,
  Flex,
  Image,
  Modal,
  Stack,
  Text,
} from "native-base";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { AuthTabParamList } from "../../../types";
import { Button } from "../../components/Button";
import { ResendButton } from "../../components/ResendButton";
import Screen from "../../components/Screen";
import useAuth from "../../hooks/useAuth";
import { useSendOtp } from "../../services/users/mutations/useSendOtp";
import { useVerifyPhoneNumber } from "../../services/users/mutations/useVerifyPhoneNumber";
import {
  formattedPhoneToRaw,
  rawPhoneToFormatted,
} from "../../utility/formatPhoneNumber";

const VerifyPhoneScreen = ({
  navigation,
}: StackScreenProps<AuthTabParamList, "VerifyPhone">) => {
  const { user, setUser, logout } = useAuth();
  const { phoneNumber } = user ?? {};
  const verifyPhoneNumber = useVerifyPhoneNumber();
  const sendOtp = useSendOtp();
  const [code, setCode] = useState<string>("");

  const onSendOtp = useCallback(async (phoneNumber) => {
    let token = await sendOtp.mutateAsync({
      phoneNumber: formattedPhoneToRaw(phoneNumber ?? ""),
    });
    setCode(token ?? "");
  }, []);

  const onSubmit = async (code: string) => {
    const token = await verifyPhoneNumber.mutateAsync({
      phoneNumber: formattedPhoneToRaw(phoneNumber ?? ""),
      code,
    });
    setUser(token);
  };

  useEffect(() => {
    if (phoneNumber) {
      onSendOtp(phoneNumber);
    }
  }, [phoneNumber]);

  return (
    <Screen>
      <Flex alignItems="flex-start">
        <Button
          onPress={() => {
            logout();
            navigation.navigate("SignIn");
          }}
          colorScheme="blackish"
          variant="ghost"
          leftIcon={<ChevronLeftIcon color="black" />}
        >
          Back to Login
        </Button>
      </Flex>
      <Center>
        <Image
          my={10}
          alt="logo"
          height="200px"
          width="200px"
          source={require("./mobile-message.png")}
        />
        <Text fontWeight="700">Code Verification</Text>

        <Flex flexDirection="row" alignItems="center">
          <Text ml={3} fontSize="sm">
            Enter Code sent to{" "}
            <Text fontSize="sm" color="primary.800">
              {rawPhoneToFormatted(phoneNumber ?? "")}
            </Text>
          </Text>
        </Flex>

        <OTPInputView
          style={{ width: "80%", height: 100 }}
          pinCount={4}
          code={code}
          onCodeChanged={setCode}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={onSubmit}
        />
      </Center>
      <Box flex={1} />

      <Stack mb={4} px={4} space={4}>
        <Button
          isDisabled={code.length < 4}
          variant="primary"
          onPress={() => onSubmit(code)}
        >
          Verify and Sign In
        </Button>
        <ResendButton onResend={() => onSendOtp(phoneNumber)} />
      </Stack>
    </Screen>
  );
};

export default VerifyPhoneScreen;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 45,
    height: 45,
    backgroundColor: "#CFE7DB",
    borderWidth: 0,
    borderRadius: 5,
    fontWeight: "700",
    color: "#2B5740",
    fontSize: 18,
  },

  underlineStyleHighLighted: {
    borderColor: "#2B5740",
  },
});
