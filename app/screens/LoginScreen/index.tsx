import { StackScreenProps } from "@react-navigation/stack";
import { Formik } from "formik";
import { Box, Center, FormControl, Heading, Image, Stack } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import * as Yup from "yup";
import { AuthTabParamList } from "../../../types";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Button } from "../../components/Button";
import { ErrorMessage } from "../../components/forms/ErrorMessage";
import { FormInputControl } from "../../components/forms/InputControl";
import { KeyboardAvoidingWrapper } from "../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import Screen from "../../components/Screen";
import useAuth from "../../hooks/useAuth";
import { useLogin } from "../../services/users/mutations/useLogin";
import { TextInputMask } from "react-native-masked-text";
import { formattedPhoneToRaw } from "../../utility/formatPhoneNumber";

const windowHeight = Dimensions.get("window").height;

const validationSchema = Yup.object({
  phoneNumber: Yup.string().required("Enter a phone number"),
  password: Yup.string()
    .required("Enter a password")
    .min(4, "Password must be at least 4 characters"),
});

function LoginScreen({
  navigation,
}: StackScreenProps<AuthTabParamList, "SignIn">) {
  const { setUser, user } = useAuth();
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const loginRequest = useLogin();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = async ({
    phoneNumber,
    password,
  }: {
    phoneNumber: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const token = await loginRequest.mutateAsync({
        phoneNumber: formattedPhoneToRaw(phoneNumber),
        password,
      });
      setUser(token);
    } catch (err) {
      setLoginFailed(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && !user.isPhoneVerified) {
      navigation.navigate("VerifyPhone");
    }
  }, [user]);

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <KeyboardAvoidingWrapper>
        <Screen>
          <Box px={4}>
            {windowHeight > 700 && (
              <Center>
                <Image
                  mt={4}
                  alt="logo"
                  width={windowHeight - 585}
                  height={windowHeight - 585}
                  source={require("./hiking.png")}
                />
              </Center>
            )}
            <Heading mt={windowHeight > 700 ? 4 : "100px"} fontSize="3xl">
              Hi!
            </Heading>
            <Formik
              initialValues={{ phoneNumber: "", password: "" }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, errors, touched, setFieldValue, values }) => (
                <>
                  <Stack space={6}>
                    <ErrorMessage
                      error="Invalid phone number and/or password"
                      visible={loginFailed}
                    />
                    <FormControl
                      isInvalid={!!(errors.phoneNumber && touched.phoneNumber)}
                    >
                      <FormControl.Label>Phone Number</FormControl.Label>
                      <TextInputMask
                        maxFontSizeMultiplier={1.25}
                        keyboardType="phone-pad"
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
                  </Stack>

                  <Button mt={6} variant="primary" onPress={handleSubmit}>
                    Login
                  </Button>
                  <Button
                    onPress={() => navigation.navigate("Forgot")}
                    variant="ghost"
                    mt={4}
                  >
                    Forgot your password?
                  </Button>
                </>
              )}
            </Formik>
          </Box>
        </Screen>
      </KeyboardAvoidingWrapper>
    </>
  );
}

export default LoginScreen;

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
