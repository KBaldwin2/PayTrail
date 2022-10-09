import { Box, Text } from "native-base";
import React from "react";

interface IProps {
  digitalReceiptCount: number;
  totalReceiptCount: number;
}

const averageReceiptLength = 26.924; //inches

export const TotalReceipts = ({
  digitalReceiptCount,
  totalReceiptCount,
}: IProps) => {
  return (
    <Box
      borderRadius="20px"
      backgroundColor="primary.800"
      position="relative"
      overflow="hidden"
    >
      <Box p={6} zIndex={2}>
        <Text color="white">Receipt Count</Text>
        <Text my={2} fontSize="4xl" color="white" fontWeight="700">
          {totalReceiptCount}
        </Text>
        <Text fontSize="sm" color="white">
          Saved {(digitalReceiptCount * (averageReceiptLength ?? 0)).toFixed(0)}{" "}
          cm of receipt paper
        </Text>
      </Box>
    </Box>
  );
};
