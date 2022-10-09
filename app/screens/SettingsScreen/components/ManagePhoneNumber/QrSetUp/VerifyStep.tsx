import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Box, Center, Flex, Image, Modal, Text } from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSendOtp } from "../../../../../services/users/mutations/useSendOtp";
import { useVerifyPhoneNumber } from "../../../../../services/users/mutations/useVerifyPhoneNumber";
import { formattedPhoneToRaw } from "../../../../../utility/formatPhoneNumber";
import { Button } from "../../../../../components/Button";

import { ResendButton } from "./ResendButton";

interface IProps {
  phoneNumber: string;
  onBack: () => void;
  onSuccess: () => void;
  token?: string | undefined; // For Dev only
}

export const VerifyStep = ({
  onSuccess,
  onBack,
  phoneNumber,
  token = "",
}: IProps) => {
  const verifyPhoneNumber = useVerifyPhoneNumber();
  const sendOtp = useSendOtp();
  const [code, setCode] = useState<string>(token);
  const onSubmit = async (code: string) => {
    await verifyPhoneNumber.mutateAsync({
      phoneNumber: formattedPhoneToRaw(phoneNumber),
      code,
    });
    onSuccess();
  };

  const onResend = async () => {
    let token = await sendOtp.mutateAsync({
      phoneNumber: formattedPhoneToRaw(phoneNumber),
    });
    setCode(token ?? "");
  };

  return (
    <>
      <Modal.Body>
        <Box>
          <Center>
            <Image
              mt={4}
              alt="logo"
              height="100px"
              width="100px"
              source={require("./mail.png")}
            />
            <Text fontWeight="700">Code Verification</Text>

            <Flex flexDirection="row" alignItems="center">
              <Text ml={3} fontSize="sm">
                Enter Code sent to
              </Text>
              <Button size="sm" onPress={onBack} variant="link">
                {phoneNumber}
              </Button>
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
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <ResendButton onResend={onResend} />
        <Button ml={4} variant="primary" onPress={() => onSubmit(code)}>
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};

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
