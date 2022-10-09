import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import { Icon, Modal, Stack, useDisclose } from "native-base";
import React from "react";
import { object, string } from "yup";
import { UpdateUserRequest } from "../../../../api/users/updateUser";
import ActivityIndicator from "../../../../components/ActivityIndicator";
import { Button } from "../../../../components/Button";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { ServerError } from "../../../../components/ServerError/ServerError";
import useAuth from "../../../../hooks/useAuth";
import { useUpdateUser } from "../../../../services/users/mutations/useUpdateUser";
import { SettingsMenuItem } from "../SettingsMenuItem/SettingsMenuItem";

export const ManageName = () => {
  const { setUser, user } = useAuth();
  const updateUser = useUpdateUser();
  const { isOpen, onClose, onOpen } = useDisclose();

  const onSubmit = async (userInfo: UpdateUserRequest) => {
    const result = await updateUser.mutateAsync(userInfo);
    setUser(result);
    handleClose();
  };

  const handleClose = () => {
    updateUser.reset();
    onClose();
  };

  return (
    <>
      <SettingsMenuItem
        onPress={onOpen}
        icon={<Icon as={<Feather name="user" />} color="gray.500" size={5} />}
        title="Name"
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <ActivityIndicator visible={updateUser.isLoading} />
          <Modal.CloseButton />
          <Modal.Header>Update Name</Modal.Header>
          <Formik
            initialValues={{
              name: user!.name,
            }}
            onSubmit={onSubmit}
            validationSchema={object({
              name: string().required("Enter a name"),
            })}
          >
            {({ handleSubmit }) => (
              <>
                <Modal.Body>
                  <Stack space={6}>
                    <ServerError message={updateUser.error?.message} />
                    <FormInputControl
                      label="Name"
                      autoCorrect={false}
                      name="name"
                      placeholder="Name"
                    />
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
