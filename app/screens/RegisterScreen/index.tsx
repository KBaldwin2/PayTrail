import { StackScreenProps } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import { Box, Flex, FormControl, Heading, Stack, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import * as Yup from "yup";
import { AuthTabParamList } from "../../../types";
import { CreateUserRequest } from "../../api/users/createUser";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Button } from "../../components/Button";
import { FormInputControl } from "../../components/forms/InputControl";
import { KeyboardAvoidingWrapper } from "../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import Screen from "../../components/Screen";
import { ServerError } from "../../components/ServerError/ServerError";
import useAuth from "../../hooks/useAuth";
import { useCreateUser } from "../../services/users/mutations/useCreateUser";
import { formattedPhoneToRaw } from "../../utility/formatPhoneNumber";

function RegisterScreen({
  navigation,
}: StackScreenProps<AuthTabParamList, "SignUp">) {
  const { setUser } = useAuth();
  const createUser = useCreateUser();

  const onSubmit = async (userInfo: CreateUserRequest) => {
    userInfo.phoneNumber = formattedPhoneToRaw(userInfo.phoneNumber);
    const result = await createUser.mutateAsync(userInfo);
    setUser(result);
    navigation.navigate("VerifyPhone");
  };

  return (
    <>
      <ActivityIndicator visible={createUser.isLoading} />

      <Screen>
        <Formik
          initialValues={{
            name: "",
            phoneNumber: "",
            password: "",
          }}
          onSubmit={onSubmit}
          validationSchema={Yup.object({
            name: Yup.string().required("Enter a name"),
            phoneNumber: Yup.string().required("Enter a phone number"),
            password: Yup.string()
              .required("Enter a password")
              .min(4, "Password must be at least 4 characters"),
          })}
        >
          {({ handleSubmit, setFieldValue, errors, values, touched }) => (
            <Box px={4} flex={1}>
              <Box flex={1}>
                <Heading mt={10} fontSize="3xl">
                  👋 Let's get started!
                </Heading>
                <KeyboardAvoidingWrapper>
                  <Stack space={4}>
                    <ServerError message={createUser.error?.message} />
                    <FormInputControl
                      autoCorrect={false}
                      name="name"
                      type="text"
                      label="Name"
                      placeholder="John"
                    />
                    <FormControl
                      isInvalid={!!(errors.phoneNumber && touched.phoneNumber)}
                    >
                      <FormControl.Label>Phone Number</FormControl.Label>
                      <TextInputMask
                        style={
                          !!(errors.phoneNumber && touched.phoneNumber)
                            ? styles.phoneInputInvalid
                            : styles.phoneInput
                        }
                        placeholder="+1 (000) 000 0000"
                        type="custom"
                        options={{
                          mask: "+1 (999) 999 9999",
                        }}
                        keyboardType="phone-pad"
                        value={values.phoneNumber}
                        placeholderTextColor="#71717a"
                        onChangeText={(text) =>
                          setFieldValue("phoneNumber", text)
                        }
                      />
                      <FormControl.ErrorMessage>
                        {errors.phoneNumber}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormInputControl
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="●●●●"
                    />

                    <Flex
                      alignItems="center"
                      flexDirection="row"
                      flexWrap="wrap"
                    >
                      <Text fontSize="sm">
                        By selecting{" "}
                        <Text fontWeight="500">Agree and Sign Up</Text> below, I
                        agree to{" "}
                      </Text>
                      <Button
                        size="sm"
                        variant="link"
                        p={0}
                        onPress={async () => {
                          await WebBrowser.openBrowserAsync(
                            "https://mypaytrail.com/terms-conditions/"
                          );
                        }}
                      >
                        Terms of Service
                      </Button>
                      <Text fontSize="sm" mx={1}>
                        and
                      </Text>
                      <Button
                        size="sm"
                        variant="link"
                        p={0}
                        onPress={async () => {
                          await WebBrowser.openBrowserAsync(
                            "https://mypaytrail.com/privacy-policy/"
                          );
                        }}
                      >
                        Privacy Policy
                      </Button>
                    </Flex>
                  </Stack>
                </KeyboardAvoidingWrapper>
              </Box>
              <Button mb={4} variant="primary" onPress={handleSubmit}>
                Agree and Sign Up
              </Button>
            </Box>
          )}
        </Formik>
      </Screen>
    </>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  phoneInput: {
    backgroundColor: "rgb(246, 250, 250)",
    borderColor: "rgb(235, 238, 241)",
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 17,
    paddingBottom: 17,
    paddingRight: 16,
    paddingLeft: 16,
  },
  phoneInputInvalid: {
    backgroundColor: "rgb(246, 250, 250)",
    borderColor: "#dc2626",
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 17,
    paddingBottom: 17,
    paddingRight: 16,
    paddingLeft: 16,
  },
});
