import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Box, Center, Flex, Heading, Image, Text } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "../../../../components/Button";
import { KeyboardAvoidingWrapper } from "../../../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import Screen from "../../../../components/Screen";
import { ServerError } from "../../../../components/ServerError/ServerError";

interface IProps {
  token?: string;
  onBack: () => void;
  email: string;
  onSubmit: ({ code }: { code: string }) => void;
  isLoading?: boolean;
  error?: string;
}

export const ResetPasswordCode = ({
  token = "",
  onBack,
  email,
  onSubmit,
  isLoading,
  error,
}: IProps) => {
  const [code, setCode] = useState<string>(token);
  return (
    <Screen>
      <KeyboardAvoidingWrapper>
        <Box px={4}>
          <Center>
            <Image
              mt={4}
              alt="logo"
              height="150px"
              width="150px"
              source={require("./mail.png")}
            />
          </Center>

          <Heading my={4} fontSize="3xl">
            Check Your Mail
          </Heading>
          <Text>
            We have sent an email to{" "}
            <Text fontWeight="500" color="primary.800">
              {email}
            </Text>{" "}
            with a code to reset your password.
          </Text>
          <Text>The Code is valid for 5 minutes.</Text>
          <ServerError message={error} />
          <Box mb={4}>
            <Center>
              <OTPInputView
                style={{ width: "80%", height: 100 }}
                pinCount={4}
                code={code}
                onCodeChanged={setCode}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => onSubmit({ code })}
              />
            </Center>
          </Box>
          <Button
            isLoading={isLoading}
            onPress={() => onSubmit({ code })}
            variant="primary"
          >
            Submit
          </Button>

          <Center mt={10}>
            <Flex
              maxWidth="300px"
              alignItems="center"
              justifyContent="center"
              flexDirection="row"
              flexWrap="wrap"
            >
              <Text fontSize="xs" textAlign="center">
                Did not receive the email? Check your spam filter,
              </Text>
              <Text lineHeight="20px" fontSize="xs" textAlign="center">
                or{" "}
                <Button onPress={onBack} size="sm" p={0} pt={1} variant="link">
                  try another email address
                </Button>
              </Text>
            </Flex>
          </Center>
        </Box>
      </KeyboardAvoidingWrapper>
    </Screen>
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
