import { format } from "date-fns";
import { Box, Divider, Flex, HStack, Square, Stack, Text } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { CountUp } from "use-count-up";
import { VictoryLabel, VictoryPie } from "victory-native";
import { IReceipt } from "../../../../models/receipt";
import { formatCurrency } from "../../../../utility/formatCurrency";

interface IProps {
  receiptsThisMonth: IReceipt[];
}

const colors = [
  "#015045",
  "#2854d0",
  "#facc15",
  "#93c5fd",
  "#c084fc",
  "#a8a29e",
];

const windowWidth = Dimensions.get("window").width;

interface IReceiptCategoryStats {
  name: string;
  total: number;
}

export const SpendingBreakdown = ({ receiptsThisMonth }: IProps) => {
  const [receiptCategories, setReceiptCategories] = useState<
    IReceiptCategoryStats[]
  >([]);

  useEffect(() => {
    // group by receiptCategoryId
    const receiptCategoriesStats = receiptsThisMonth.reduce(
      (acc: IReceiptCategoryStats[], receipt) => {
        if (receipt!.total ?? 0 > 0) {
          const category = acc.find(
            (x) => x.name === receipt.receiptCategory?.description
          );
          if (category) {
            category.total += receipt.total ?? 0;
          } else {
            acc.push({
              name: receipt.receiptCategory?.description ?? "",
              total: receipt.total ?? 0,
            });
          }
        }
        return acc;
      },
      []
    );
    receiptCategoriesStats.sort(
      (a, b) => b.total - a.total || a.name.localeCompare(b.name)
    );

    if (receiptCategoriesStats.length > 4) {
      const firstHalf = receiptCategoriesStats.splice(0, 4);
      const sumRest = receiptCategoriesStats.reduce((acc, x) => {
        return acc + x.total;
      }, 0);
      firstHalf.push({
        name: "Other Categories",
        total: sumRest,
      });
      setReceiptCategories([...firstHalf]);
    } else {
      setReceiptCategories(
        receiptCategoriesStats.sort(
          (a, b) => b.total - a.total || a.name.localeCompare(b.name)
        )
      );
    }
  }, [receiptsThisMonth]);

  // receipts total
  const total = receiptCategories.reduce((acc, curr) => {
    return acc + curr.total;
  }, 0);
  const data = receiptCategories.map((x) => ({
    x: `${Math.ceil((x.total / total) * 100)}%`,
    y: x.total,
  }));

  return (
    <>
      <Box position="relative" mb={-8}>
        <VictoryPie
          width={windowWidth - 32}
          padding={75}
          innerRadius={75}
          padAngle={2}
          radius={({ datum }) => 100 + 25 * (datum.y / total)}
          colorScale={colors}
          labelComponent={
            <VictoryLabel
              backgroundPadding={{ top: 5, bottom: 5, left: 6, right: 6 }}
            />
          }
          data={data}
        />
        <Flex
          zIndex={1000}
          position="absolute"
          justifyContent="center"
          alignItems="center"
          top={0}
          left={0}
          bottom={0}
          right={0}
        >
          <Text fontSize="2xl" mb={-2} fontWeight="700">
            <CountUp
              isCounting
              formatter={formatCurrency}
              end={total}
              duration={1.5}
            />
          </Text>
          <Text fontSize="md" color="gray.400">
            in {format(new Date(), "MMMM").toLocaleLowerCase()}
          </Text>
        </Flex>
      </Box>
      <Stack space={4} divider={<Divider />}>
        {receiptCategories.map((x, index) => (
          <Flex key={index} justifyContent="space-between" flexDirection="row">
            <HStack space={4} alignItems="center">
              <Square size={3} backgroundColor={colors[index]} />
              <Text fontWeight="500">{x.name}</Text>
            </HStack>

            <Text fontWeight="500">{formatCurrency(x.total ?? 0)}</Text>
          </Flex>
        ))}
      </Stack>
    </>
  );
};
