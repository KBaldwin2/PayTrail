import { format } from "date-fns";
import { HStack, Stack, Text } from "native-base";
import React from "react";
import { Dimensions, TouchableHighlight } from "react-native";
import { FileCategoryEnum } from "../../../../../../models/fileDetail";
import { IReceipt } from "../../../../../../models/receipt";
import { formatCurrency } from "../../../../../../utility/formatCurrency";
import { ItemIcon } from "../ItemIcon/ItemIcon";

interface IProps {
  receipt: IReceipt;
  onViewReceipt: (receipt: IReceipt) => void;
}

const windowWidth = Dimensions.get("window").width;

export const ReceiptListItem = ({ receipt, onViewReceipt }: IProps) => {
  return (
    <TouchableHighlight onPress={() => onViewReceipt(receipt)}>
      <HStack
        backgroundColor="white"
        px={6}
        py={5}
        space={4}
        alignItems="flex-start"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <ItemIcon receiptCategory={receipt.receiptCategory!} />

        <Stack flexGrow={1} mr={1} space={0} maxW={windowWidth - 205}>
          <Text noOfLines={1} fontSize="md" fontWeight="500">
            {receipt.store}
          </Text>

          <Text noOfLines={2} fontSize="xs">
            {receipt.memo ?? "-"}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {format(new Date(receipt.date), "PP")}
          </Text>
        </Stack>
        <Stack flexGrow={1} space={0} alignItems="flex-end">
          <Text fontSize="16px" fontWeight="700">
            {!receipt.total ? "-" : formatCurrency(receipt.total)}
          </Text>

          {!receipt.fileDetail ||
          receipt.fileDetail.fileCategory === FileCategoryEnum.IMAGE ? (
            <Text textAlign="right" fontSize="12px" color="gray.500">
              via Phone
            </Text>
          ) : (
            <Text textAlign="right" fontSize="12px" color="gray.500">
              via Email
            </Text>
          )}
        </Stack>
      </HStack>
    </TouchableHighlight>
  );
};
