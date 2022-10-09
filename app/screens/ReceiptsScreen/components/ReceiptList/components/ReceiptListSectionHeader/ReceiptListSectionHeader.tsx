import { format } from "date-fns";
import { Box, Flex, Text } from "native-base";
import React from "react";
import { formatCurrency } from "../../../../../../utility/formatCurrency";

interface IProps {
  date: string;
  total: number;
}

export const ReceiptListSectionHeader = ({ date, total }: IProps) => {
  return (
    <Flex
      backgroundColor="warmGray.100"
      key={date}
      py={2}
      px={4}
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
    >
      <Text
        fontWeight="700"
        fontSize="16px"
        color="gray.800"
        textTransform="uppercase"
      >
        {format(new Date(date), "MMMM yyyy")}
      </Text>

      <Box>
        <Text fontSize="13px" fontWeight="700">
          {formatCurrency(total)}
        </Text>
      </Box>
    </Flex>
  );
};
