import { List, Modal, Text } from "native-base";
import React from "react";
import { Button } from "../../../../components/Button";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailInfoModal = ({ isOpen, onClose }: IProps) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body>
          <Text mt={5}>
            Your PayTrail email can be used at any store that offers email
            receipts
          </Text>
          <List.Ordered borderWidth="0">
            <List.Item>Complete purchase</List.Item>
            <List.Item>Choose email receipt</List.Item>
            <List.Item>Type in your PayTrail email</List.Item>
            <List.Item>
              The receipt is saved directly to your in-app PayTrail library.
              Skip the spam mail and say goodbye to a cluttered inbox.
            </List.Item>
          </List.Ordered>
          <Text fontSize="xs">
            We are growing and so are our retail partners. If email receipt
            is not an option at your favorite store, reach out and let us know!
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onPress={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
