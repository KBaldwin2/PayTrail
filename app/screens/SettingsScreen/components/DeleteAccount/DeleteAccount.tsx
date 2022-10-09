import { AntDesign } from "@expo/vector-icons";
import { Formik } from "formik";
import { HStack, Icon, Modal, Stack, Text, useDisclose } from "native-base";
import React from "react";
import { object, string } from "yup";
import ActivityIndicator from "../../../../components/ActivityIndicator";
import { Button } from "../../../../components/Button";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { ServerError } from "../../../../components/ServerError/ServerError";
import useAuth from "../../../../hooks/useAuth";
import useHasBeenOnboarding from "../../../../hooks/useHasBeenOnboarded";
import useSkipEmail from "../../../../hooks/useSkipEmail";
import { useDeleteUser } from "../../../../services/users/mutations/useDeleteUser";
import { SettingsMenuItem } from "../SettingsMenuItem/SettingsMenuItem";

export const DeleteAccount = () => {
  const { logout } = useAuth();
  const { reset: resetOnboarding } = useHasBeenOnboarding();
  const { reset } = useSkipEmail();
  const deleteUser = useDeleteUser();
  const { isOpen, onClose, onOpen } = useDisclose();

  const onSubmit = async () => {
    await deleteUser.mutateAsync();
    reset();
    resetOnboarding();
    logout();
  };

  const handleClose = () => {
    deleteUser.reset();
    onClose();
  };

  return (
    <>
      <SettingsMenuItem
        onPress={onOpen}
        icon={
          <Icon
            as={<AntDesign name="deleteuser" />}
            color="gray.500"
            size={5}
          />
        }
        title="Delete Account"
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <ActivityIndicator visible={deleteUser.isLoading} />
          <Modal.CloseButton />
          <Modal.Header>Delete Account</Modal.Header>
          <Formik
            initialValues={{
              verification: "",
            }}
            onSubmit={onSubmit}
            validationSchema={object({
              verification: string()
                .matches(/delete/i, 'Must enter "delete"')
                .required('Must enter "delete"'),
            })}
          >
            {({ handleSubmit }) => (
              <>
                <Modal.Body>
                  <Text>
                    Are you sure you want to delete your account? This action is
                    irreversible and all data will be lost permanently.
                  </Text>
                  <Stack space={6}>
                    <ServerError message={deleteUser.error?.message} />
                    <FormInputControl
                      label={`Type "delete" to confirm`}
                      autoCapitalize="none"
                      autoCorrect={false}
                      type="text"
                      name="verification"
                      placeholder="delete"
                    />
                  </Stack>
                </Modal.Body>
                <Modal.Footer>
                  <HStack space={4}>
                    <Button onPress={handleClose} variant="secondary">
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      colorScheme="red"
                      onPress={handleSubmit}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Modal.Footer>
              </>
            )}
          </Formik>
        </Modal.Content>
      </Modal>
    </>
  );
};
