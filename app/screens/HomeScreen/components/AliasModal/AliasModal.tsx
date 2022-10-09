import { Formik } from "formik";
import { HStack, InputRightAddon, Modal, Stack, Text } from "native-base";
import React from "react";
import { object, string } from "yup";
import { UpdateAliasRequest } from "../../../../api/users/updateAlias";
import { Button } from "../../../../components/Button";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { ServerError } from "../../../../components/ServerError/ServerError";
import useAuth from "../../../../hooks/useAuth";
import { useUpdateAlias } from "../../../../services/users/mutations/useUpdateAlias";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AliasModal = ({ isOpen, onClose }: IProps) => {
  const updateAlias = useUpdateAlias();
  const { user, setUser } = useAuth();

  const onSubmit = async (userInfo: UpdateAliasRequest) => {
    const result = await updateAlias.mutateAsync(userInfo);
    setUser(result);
    handleClose();
  };

  const handleClose = () => {
    updateAlias.reset();
    onClose();
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />

        <Formik
          initialValues={{
            alias: user?.alias ?? "",
          }}
          onSubmit={onSubmit}
          validationSchema={object({
            alias: string()
              .required()
              .label("Nickname")
              .matches(
                /^[a-zA-Z0-9_]*$/g,
                "Nickname can only contain letters, numbers and underscores"
              ),
          })}
        >
          {({ handleSubmit }) => (
            <>
              <Modal.Body>
                <Text my={5}>
                  Use your {user?.phoneNumber?.slice(1)}@mypaytrail.com OR set a
                  PayTrail email nickname to use at the till!
                </Text>
                <Stack space={6}>
                  <ServerError message={updateAlias.error?.message} />
                  <FormInputControl
                    autoCapitalize="none"
                    autoCorrect={false}
                    type="text"
                    name="alias"
                    label="Nickname"
                    borderRightRadius={0}
                    placeholder="greenzone"
                    InputRightElement={
                      <InputRightAddon
                        height="51px"
                        children="@mypaytrail.com"
                        borderColor="white"
                      />
                    }
                  />
                </Stack>
              </Modal.Body>
              <Modal.Footer>
                <HStack space={4}>
                  <Button variant="secondary" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button variant="primary" onPress={handleSubmit}>
                    Update
                  </Button>
                </HStack>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};
