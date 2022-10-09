import { Feather } from "@expo/vector-icons";
import { Icon, Modal, Text, useDisclose } from "native-base";
import React from "react";
import { Button } from "../../../../components/Button";
import useAuth from "../../../../hooks/useAuth";
import useSkipEmail from "../../../../hooks/useSkipEmail";
import { SettingsMenuItem } from "../SettingsMenuItem/SettingsMenuItem";

export const Logout = () => {
  const { logout } = useAuth();
  const { reset } = useSkipEmail();
  const { isOpen, onClose, onOpen } = useDisclose();

  return (
    <>
      <SettingsMenuItem
        onPress={onOpen}
        icon={
          <Icon as={<Feather name="log-out" />} color="gray.500" size={5} />
        }
        title="Logout"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Logout</Modal.Header>
          <Modal.Body>
            <Text>Are you sure you want to logout?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" mr={4} onPress={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onPress={() => {
                logout();
                reset();
              }}
            >
              Logout
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
