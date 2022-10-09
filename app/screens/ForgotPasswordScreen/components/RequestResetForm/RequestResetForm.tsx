import { Formik } from "formik";
import { Box, Center, Flex, Heading, Image, Stack, Text } from "native-base";
import { Dimensions } from "react-native";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { KeyboardAvoidingWrapper } from "../../../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import Screen from "../../../../components/Screen";
import { ServerError } from "../../../../components/ServerError/ServerError";
import * as Yup from "yup";
import { Button } from "../../../../components/Button";

interface IProps {
  onBackToLogin: () => void;
  onSubmit: ({ email }: { email: string }) => void;
  error?: string;
  isLoading?: boolean;
}

const windowHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
});

export const RequestResetForm = ({
  onBackToLogin,
  onSubmit,
  error,
  isLoading,
}: IProps) => {
  return (
    <>
      <KeyboardAvoidingWrapper>
        <Flex flex={1} px={4}>
          <Flex flex={1}>
            <Center>
              <Image
                mt={4}
                alt="logo"
                height={200}
                source={require("./forgot.png")}
              />
            </Center>

            <Heading my={4} fontSize="3xl">
              Reset Password
            </Heading>
            <Text>
              Enter the email associated with your account and we'll send an
              email with instructions to reset your password.
            </Text>
          </Flex>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <>
                <Stack space={6}>
                  <Box>
                    <ServerError message={error} />
                  </Box>
                  <FormInputControl
                    label="Your Email Address"
                    type="email"
                    name="email"
                    placeholder="john.doe@gmail.com"
                  />
                </Stack>

                <Button
                  isLoading={isLoading}
                  mt={6}
                  variant="primary"
                  onPress={handleSubmit}
                >
                  Send Instructions
                </Button>
                <Button onPress={onBackToLogin} variant="ghost" mt={4}>
                  Back to Login
                </Button>
              </>
            )}
          </Formik>
        </Flex>
      </KeyboardAvoidingWrapper>
    </>
  );
};
