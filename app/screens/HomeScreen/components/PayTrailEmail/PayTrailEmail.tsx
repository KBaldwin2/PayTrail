import { Feather } from "@expo/vector-icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useDisclose,
} from "native-base";
import useAuth from "../../../../hooks/useAuth";
import { AliasModal } from "../AliasModal";

export const PayTrailEmail = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { user } = useAuth();

  return (
    <>
      <AliasModal isOpen={isOpen} onClose={onClose} />
      <Box>
        <HStack alignItems="center" space={4}>
          <Flex
            backgroundColor="primary.800"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
            size="40px"
          >
            <Icon as={Feather} size={6} name="mail" color="white" />
          </Flex>
          {user?.alias ? (
            <Stack>
              <Text fontSize="lg" fontWeight="700">
                {user?.alias ?? ""}@mypaytrail.com
              </Text>
              <Text fontSize="sm" fontWeight="700">
                or {(user?.phoneNumber ?? "").slice(1)}@mypaytrail.com
              </Text>
            </Stack>
          ) : (
            <Text fontSize="lg" flexShrink={1} fontWeight="700">
              {(user?.phoneNumber ?? "").slice(1)}@mypaytrail.com
            </Text>
          )}
        </HStack>
        <HStack
          display="flex"
          space="2"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button
            onPress={() => onOpen()}
            variant="secondary"
            size="sm"
            textAlign="center"
          >
            {user?.alias ? "Update Nickname" : "Set Nickname"}
          </Button>
        </HStack>
      </Box>
    </>
  );
};
