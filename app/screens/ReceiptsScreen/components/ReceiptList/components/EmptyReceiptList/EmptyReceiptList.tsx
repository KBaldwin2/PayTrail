import { Box, Center, Heading, Text } from "native-base";
import { Button } from "../../../../../../components/Button";
import { DotPattern } from "../../../../../../components/patterns/DotPattern";

interface IProps {
  onAddReceipt: () => void;
}

export const EmptyReceiptList = ({ onAddReceipt }: IProps) => {
  return (
    <Box mx={4}>
      <Center
        py={10}
        px={4}
        mt={10}
        backgroundColor="primary.100"
        rounded="md"
        position="relative"
      >
        <Heading textAlign="center" fontSize="3xl" color="primary.800" mb={4}>
          No Receipts added yet
        </Heading>
        <Text fontSize="sm" textAlign="center" mb={10}>
          Join the No-Print-Zone by adding your first Receipt.
        </Text>
        <Box>
          <Button variant="primary" zIndex={2} onPress={onAddReceipt}>
            Add a Receipt
          </Button>
          <Box position="absolute" right="-175px" bottom="-77px">
            <DotPattern
              color="primary.800"
              opacity="0.8"
              width="250px"
              height="150px"
            />
          </Box>
        </Box>
      </Center>
    </Box>
  );
};
