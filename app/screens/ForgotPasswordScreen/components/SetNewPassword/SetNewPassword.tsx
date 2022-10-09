import { Formik } from "formik";
import { Box, Heading, Stack } from "native-base";
import { object, ref, string } from "yup";
import { Button } from "../../../../components/Button";
import { FormInputControl } from "../../../../components/forms/InputControl";
import { KeyboardAvoidingWrapper } from "../../../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import Screen from "../../../../components/Screen";
import { ServerError } from "../../../../components/ServerError/ServerError";

interface IProps {
  error?: string;
  isLoading?: boolean;
  onSubmit: ({ password }: { password: string }) => void;
}

export const SetNewPassword = ({ error, isLoading, onSubmit }: IProps) => {
  return (
    <Screen>
      <KeyboardAvoidingWrapper>
        <Box px={4} mt={10}>
          <Heading my={4} fontSize="3xl">
            Create New Password
          </Heading>
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={({ newPassword }) => {
              onSubmit({ password: newPassword });
            }}
            validationSchema={object({
              newPassword: string().required().min(4).label("New Password"),
              confirmPassword: string().oneOf(
                [ref("newPassword"), null],
                "Passwords must match"
              ),
            })}
          >
            {({ handleSubmit }) => (
              <Stack space={6}>
                <ServerError message={error} />
                <FormInputControl
                  label="New Password"
                  type="password"
                  name="newPassword"
                  placeholder="●●●●"
                  helperText="Must be at least 4 characters"
                />
                <FormInputControl
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="●●●●"
                  helperText="Both passwords must match"
                />
                <Button
                  isLoading={isLoading}
                  variant="primary"
                  onPress={handleSubmit}
                >
                  Reset Password
                </Button>
              </Stack>
            )}
          </Formik>
        </Box>
      </KeyboardAvoidingWrapper>
    </Screen>
  );
};
