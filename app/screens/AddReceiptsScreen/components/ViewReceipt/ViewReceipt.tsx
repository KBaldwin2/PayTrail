import { format } from "date-fns";
import {
  Divider,
  Flex,
  ScrollView,
  Stack,
  Text,
  useDisclose,
} from "native-base";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/Button";
import { DeleteModal } from "../../../../components/DeleteModal/DeleteModal";
import Screen from "../../../../components/Screen";
import settings from "../../../../config/settings";
import { IReceipt } from "../../../../models/receipt";
import { useReceiptsDelete } from "../../../../services/receipts/mutations/useReceiptsDelete";
import { formatCurrency } from "../../../../utility/formatCurrency";
import { ImagePreview } from "../ImagePreview/ImagePreview";

interface IProps {
  receipt: IReceipt;
  onEdit: () => void;
  onDeleteSuccess: () => void;
}

export const ViewReceipt = ({ receipt, onEdit, onDeleteSuccess }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const deleteReceipt = useReceiptsDelete();
  const [imagePath, setImagePath] = useState<string | undefined>("");

  useEffect(() => {
    setImagePath(
      receipt?.fileDetail
        ? `${settings.apiUrl}/receipts/${receipt?.id}/fileDetail`
        : ""
    );
  }, [receipt]);

  return (
    <Screen>
      <ScrollView>
        <Stack mb={12} mx={4} space={4} divider={<Divider color="gray.200" />}>
          <Flex direction="row" justifyContent="space-between">
            <Text fontSize="md" fontWeight="500" width="100px">
              Date
            </Text>
            <Text fontSize="md">{format(new Date(receipt.date), "P")}</Text>
          </Flex>
          <Flex direction="row" justifyContent="space-between">
            <Text fontSize="md" fontWeight="500" width="100px">
              Store
            </Text>
            <Text fontSize="md">{receipt.store}</Text>
          </Flex>
          <Flex direction="row" justifyContent="space-between">
            <Text fontSize="md" fontWeight="500" width="100px">
              Total
            </Text>
            <Text fontSize="md">
              {receipt.total ? formatCurrency(receipt.total) : "-"}
            </Text>
          </Flex>
          <Flex direction="row" justifyContent="space-between">
            <Text fontSize="md" fontWeight="500" width="100px">
              Category
            </Text>
            <Text fontSize="md">{receipt.receiptCategory?.description}</Text>
          </Flex>
          <Flex direction="row" justifyContent="space-between">
            <Text fontSize="md" fontWeight="500" width="100px">
              Warranty
            </Text>
            <Text fontSize="md">
              {receipt.hasWarranty
                ? receipt.isLifetimeWarranty
                  ? "Lifetime Warranty"
                  : receipt.warrantyExpirationDate
                  ? `exp. ${format(receipt.warrantyExpirationDate, "P")}`
                  : "No warranty"
                : "No warranty"}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="md" fontWeight="500">
              Memo
            </Text>
            <Text fontSize="md">{receipt.memo ? receipt.memo : "-"}</Text>
          </Flex>
          <Flex>
            <Text fontSize="md" fontWeight="500">
              Attachment
            </Text>
            <ImagePreview
              imagePath={imagePath}
              fileDetail={receipt.fileDetail}
            />
          </Flex>
          <Stack space={4} alignItems="center">
            <Button width="100%" variant="primary" onPress={onEdit}>
              Edit
            </Button>

            <Button
              width="100%"
              variant="secondary"
              onPress={onOpen}
              colorScheme="red"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          onDelete={async () => {
            onClose();
            onDeleteSuccess();
            await deleteReceipt.mutateAsync(receipt.id!);
          }}
          error={deleteReceipt.error}
          isLoading={deleteReceipt.isLoading}
          message="Are you sure you want to delete this receipt?"
        />
      </ScrollView>
    </Screen>
  );
};
