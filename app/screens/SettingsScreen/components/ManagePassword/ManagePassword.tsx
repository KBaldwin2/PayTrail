import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import { Icon, Modal, Stack, useDisclose } from "native-base";
import React from "react";
import { object, ref, string } from "yup";
import { UpdatePasswordRequest } from "../../../../api/users/updatePassword";
import ActivityIndicator from "../../../../components/ActivityIndicator";
import { Button } from "../../../../components/Button";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { ServerError } from "../../../../components/ServerError/ServerError";
import { useUpdatePassword } from "../../../../services/users/mutations/useUpdatePassword";
import { SettingsMenuItem } from "../SettingsMenuItem/SettingsMenuItem";

export const ManagePassword = () => {
  const updatePassword = useUpdatePassword();
  const { isOpen, onClose, onOpen } = useDisclose();

  const onSubmit = async (userInfo: UpdatePasswordRequest) => {
    await updatePassword.mutateAsync(userInfo);
    handleClose();
  };

  const handleClose = () => {
    updatePassword.reset();
    onClose();
  };

  return (
    <>
      <SettingsMenuItem
        onPress={onOpen}
        icon={
          <Icon
            as={<MaterialCommunityIcons name="form-textbox-password" />}
            color="gray.500"
            size={5}
          />
        }
        title="Password"
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <ActivityIndicator visible={updatePassword.isLoading} />
          <Modal.CloseButton />
          <Modal.Header>Update Password</Modal.Header>
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={onSubmit}
            validationSchema={object({
              oldPassword: string().required().min(4).label("Old Password"),
              newPassword: string().required().min(4).label("New Password"),
              confirmPassword: string().oneOf(
                [ref("newPassword"), null],
                "Passwords must match"
              ),
            })}
          >
            {({ handleSubmit }) => (
              <>
                <Modal.Body>
                  <Stack space={6}>
                    <ServerError message={updatePassword.error?.message} />
                    <FormInputControl
                      type="password"
                      name="oldPassword"
                      placeholder="Old Password"
                    />
                    <FormInputControl
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                    />
                    <FormInputControl
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
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
