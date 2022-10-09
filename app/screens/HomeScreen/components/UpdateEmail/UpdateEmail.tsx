import { Formik } from "formik";
import { Box, Button, Modal, Spacer, Stack, Text } from "native-base";
import { useEffect } from "react";
import { object, string } from "yup";
import { UpdateEmailRequest } from "../../../../api/users/updateEmail";
import ActivityIndicator from "../../../../components/ActivityIndicator";
import { FormCheckboxControl } from "../../../../components/forms/Checkbox";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { ServerError } from "../../../../components/ServerError/ServerError";
import useAuth from "../../../../hooks/useAuth";
import useSkipEmail from "../../../../hooks/useSkipEmail";
import { useUpdateEmail } from "../../../../services/users/mutations/useUpdateEmail";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateEmail = () => {
  const { user, setUser } = useAuth();
  const { hasUserSkippedEmailAddress, skipEmailAddress } = useSkipEmail();
  const isOpen = !user?.emailAddress && !hasUserSkippedEmailAddress;

  const updateEmail = useUpdateEmail();

  const onSubmit = async (userInfo: UpdateEmailRequest) => {
    const result = await updateEmail.mutateAsync(userInfo);
    setUser(result);
  };

  const onSkip = () => {
    skipEmailAddress();
  };

  useEffect(() => {
    updateEmail.reset();
  }, [isOpen]);

  return (
    <Modal size="xl" isOpen={isOpen}>
      <Modal.Content>
        <ActivityIndicator visible={updateEmail.isLoading} />
        <Modal.Header>Set an Email</Modal.Header>
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
              <Modal.Body flex={1}>
                <Text mb={4}>
                  If you ever need to recover your account we will use your
                  Email address to send you instructions on how to reset your
                  account.
                </Text>
                <Stack mb={10} space={4}>
                  <ServerError message={updateEmail.error?.message} />
                  <FormInputControl
                    autoCapitalize="none"
                    autoCorrect={false}
                    type="email"
                    name="emailAddress"
                    placeholder="jon@gmail.com"
                    label="Email Address"
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
                <Spacer />
                <Button mb={4} variant="primary" onPress={handleSubmit}>
                  Set Email
                </Button>
                <Button variant="ghost" onPress={onSkip}>
                  I'll do it later
                </Button>
              </Modal.Body>
            </>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};
