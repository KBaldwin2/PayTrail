import { Feather } from "@expo/vector-icons";
import {
  Alert,
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  Text,
  useDisclose,
} from "native-base";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { rawPhoneToFormatted } from "../../../../utility/formatPhoneNumber";
import { SettingsMenuItem } from "../SettingsMenuItem/SettingsMenuItem";
import { QrSetUp } from "./QrSetUp";

export const ManagePhoneNumber = () => {
  const { user } = useAuth();
  const [isEditing, setEditing] = useState<boolean>(false);
  const { isOpen, onClose, onOpen } = useDisclose();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setEditing(false);
    }
  }, [isOpen]);

  return (
    <>
      <SettingsMenuItem
        onPress={onOpen}
        icon={
          <Icon as={<Feather name="smartphone" />} color="gray.500" size={5} />
        }
        title="Update Phone Number"
      />
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Modal.Content>
          <Modal.CloseButton />
          {isEditing ? (
            <QrSetUp onSuccess={() => setEditing(false)} />
          ) : (
            <>
              <Modal.Body>
                <Alert w="100%" status="warning" colorScheme="warning" mt={4}>
                  <HStack
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Alert.Icon />
                    <Text fontSize="sm" textAlign="center">
                      Updating your Phone Number will change your PayTrail email
                    </Text>
                  </HStack>
                </Alert>
                <Box mt={4}>
                  <Text textAlign="center">Current Phone Number</Text>
                  <Text
                    textAlign="center"
                    fontWeight="700"
                    fontSize="lg"
                    color="primary.800"
                  >
                    {rawPhoneToFormatted(user?.phoneNumber || "")}
                  </Text>
                </Box>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onPress={() => setEditing(true)}>
                  Update
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
};
