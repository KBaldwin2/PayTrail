import { Center, HStack, Modal, Text } from "native-base";
import React from "react";
import { Button } from "../Button";
import { CenteredLoadingIndicator } from "../LoadingIndicator/CenteredLoadingIndicator";
import { ServerError } from "../ServerError/ServerError";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  message: string;
  error: string | null;
  isLoading: boolean;
}

export const DeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  message,
  error,
  isLoading,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header _text={{ textAlign: "center" }}>
          Confirm Delete
        </Modal.Header>
        <Modal.Body>
          <ServerError message={error} />
          {isLoading ? (
            <CenteredLoadingIndicator />
          ) : (
            <Center my={5}>
              <Text textAlign="center">{message}</Text>
            </Center>
          )}
        </Modal.Body>
        <Modal.Footer>
          <HStack space={4}>
            <Button variant="secondary" onPress={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onPress={onDelete}>
              Delete
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
