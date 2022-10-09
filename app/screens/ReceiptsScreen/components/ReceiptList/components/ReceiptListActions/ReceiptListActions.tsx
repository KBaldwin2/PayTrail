import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Icon, Pressable, VStack } from "native-base";
import { useReceiptsDelete } from "../../../../../../services/receipts/mutations/useReceiptsDelete";

interface IProps {
  receiptId: string;
  onClose: () => void;
}

export const ReceiptListActions = ({ receiptId, onClose }: IProps) => {
  const deleteReceipt = useReceiptsDelete();

  const onDelete = async () => {
    onClose();
    try {
      await deleteReceipt.mutateAsync(receiptId);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <HStack flex="1" justifyContent="flex-end" pl="2">
      <Pressable
        w="60"
        bg="red.500"
        justifyContent="center"
        onPress={onDelete}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="sm" />
        </VStack>
      </Pressable>
    </HStack>
  );
};
