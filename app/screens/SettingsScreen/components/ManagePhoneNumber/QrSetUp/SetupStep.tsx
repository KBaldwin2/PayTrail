import { Formik } from "formik";
import { Box, Center, FormControl, Modal, Stack } from "native-base";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { object, string } from "yup";
import ActivityIndicator from "../../../../../components/ActivityIndicator";
import { Button } from "../../../../../components/Button";
import { KeyboardAvoidingWrapper } from "../../../../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import { ServerError } from "../../../../../components/ServerError/ServerError";
import useAuth from "../../../../../hooks/useAuth";
import { useSendOtp } from "../../../../../services/users/mutations/useSendOtp";
import { formattedPhoneToRaw } from "../../../../../utility/formatPhoneNumber";

interface IProps {
  onSuccess: (phoneNumber: string, token: string | undefined) => void;
}

export const SetupStep = ({ onSuccess }: IProps) => {
  const { user } = useAuth();
  const sendOtp = useSendOtp();
  const onSubmit = async ({ phoneNumber }: { phoneNumber: string }) => {
    sendOtp.reset();
    let token = await sendOtp.mutateAsync({
      phoneNumber: formattedPhoneToRaw(phoneNumber),
    });
    onSuccess(phoneNumber, token);
  };

  return (
    <Formik
      initialValues={{
        phoneNumber: user?.phoneNumber || "",
      }}
      validationSchema={object({
        phoneNumber: string().required().label("Phone Number"),
      })}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, setFieldValue, values, errors }) => (
        <>
          <ActivityIndicator visible={sendOtp.isLoading} />
          <Modal.Header>Update Phone Number</Modal.Header>
          <Modal.Body>
            <KeyboardAvoidingWrapper
              keyboardVerticalOffset={Platform.OS === "ios" ? 180 : 0}
            >
              <Box>
                <Center>
                  <Stack space={4} w="100%">
                    <ServerError message={sendOtp.error?.message} />
                    <FormControl my={4}>
                      <FormControl.Label>Phone Number</FormControl.Label>
                      <TextInputMask
                        textAlign="center"
                        style={styles.phoneInput}
                        placeholder="+1 (000) 000 0000"
                        type="custom"
                        options={{
                          mask: "+1 (999) 999 9999",
                        }}
                        value={values.phoneNumber}
                        onChangeText={(text) =>
                          setFieldValue("phoneNumber", text)
                        }
                      />
                      <FormControl.ErrorMessage>
                        {errors.phoneNumber}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </Stack>
                </Center>
              </Box>
            </KeyboardAvoidingWrapper>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onPress={handleSubmit}>
              Verify
            </Button>
          </Modal.Footer>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  phoneInput: {
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CBD5E0",
    borderRadius: 5,
  },
});
