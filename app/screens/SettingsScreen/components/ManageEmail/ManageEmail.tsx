import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import { Icon, Modal, Stack, Text, useDisclose } from "native-base";
import React from "react";
import { object, string } from "yup";
import { UpdateEmailRequest } from "../../../../api/users/updateEmail";
import ActivityIndicator from "../../../../components/ActivityIndicator";
import { Button } from "../../../../components/Button";
import { FormCheckboxControl } from "../../../../components/forms/Checkbox";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { ServerError } from "../../../../components/ServerError/ServerError";
import useAuth from "../../../../hooks/useAuth";
import { useUpdateEmail } from "../../../../services/users/mutations/useUpdateEmail";
import { SettingsMenuItem } from "../SettingsMenuItem/SettingsMenuItem";

export const ManageEmail = () => {
  const { setUser, user } = useAuth();
  const updateEmail = useUpdateEmail();
  const { isOpen, onClose, onOpen } = useDisclose();

  const onSubmit = async (userInfo: UpdateEmailRequest) => {
    const result = await updateEmail.mutateAsync(userInfo);
    setUser(result);
    handleClose();
  };

  const handleClose = () => {
    updateEmail.reset();
    onClose();
  };

  return (
    <>
      <SettingsMenuItem
        onPress={onOpen}
        icon={<Icon as={<Feather name="mail" />} color="gray.500" size={5} />}
        title="Email Address"
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <ActivityIndicator visible={updateEmail.isLoading} />
          <Modal.CloseButton />
          <Modal.Header>Update Email</Modal.Header>
          <Formik
            initialValues={{
              emailAddress: user?.emailAddress ?? "",
              acceptMarketing: user?.acceptMarketing ?? false,
            }}
            onSubmit={onSubmit}
            validationSchema={object({
              emailAddress: string().required().email().label("Email Address"),
            })}
          >
            {({ handleSubmit }) => (
              <>
                <Modal.Body>
                  <Stack space={6}>
                    <ServerError message={updateEmail.error?.message} />
                    <FormInputControl
                      autoCapitalize="none"
                      autoCorrect={false}
                      type="email"
                      name="emailAddress"
                      placeholder="Email"
                    />
                    <Stack>
                      <FormCheckboxControl name="acceptMarketing">
                        <Text fontSize="md" ml={2}>
                          Marketing Emails
                        </Text>
                      </FormCheckboxControl>
                      <Text ml={7} fontSize="xs">
                        Stay in the loop by receiving promotional and update
                        emails from us
                      </Text>
                    </Stack>
                  </Stack>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onPress={handleSubmit}>
                    Update
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Formik>
        </Modal.Content>
      </Modal>
    </>
  );
};
