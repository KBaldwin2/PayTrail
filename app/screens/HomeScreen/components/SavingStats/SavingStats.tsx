import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Box, Circle, Flex, HStack, Icon, Text } from "native-base";
import React from "react";
import { CountUp } from "use-count-up";

interface IProps {
  receiptCount: number;
  profileCompleted: boolean;
}

const energyUsed = 32.5; //kJ
const woodUsed = 3; //g
const co2Used = 12.7; //g
const waterUsed = 160; //ml
const cmReceiptUsed = 10.6; //cm

export const SavingStats = ({ receiptCount, profileCompleted }: IProps) => {
  return (
    <HStack space={4}>
      {!profileCompleted && (
        <Flex
          justifyContent="space-between"
          height="150px"
          width="125px"
          borderRadius="20px"
          backgroundColor="primary.100"
          p={4}
        >
          <Circle backgroundColor="primary.400" size="40px">
            <Icon
              as={<Ionicons name="receipt-outline" />}
              color="white"
              size={5}
            />
          </Circle>
          <Box>
            <Text lineHeight="24px" fontSize="2xl" fontWeight="bold">
              <CountUp
                isCounting
                end={Math.ceil(receiptCount * cmReceiptUsed)}
                duration={1.5}
              />{" "}
              <Text fontSize="md" fontWeight="bold">
                cm
              </Text>
            </Text>
            <Text fontSize="xs">length saved</Text>
          </Box>
        </Flex>
      )}

      <Flex
        justifyContent="space-between"
        height="150px"
        width="125px"
        borderRadius="20px"
        backgroundColor="yellow.100"
        p={4}
      >
        <Circle backgroundColor="yellow.400" size="40px">
          <Icon
            pl="3px"
            as={<FontAwesome5 name="lightbulb" />}
            color="white"
            size={5}
          />
        </Circle>
        <Box>
          <Text lineHeight="24px" fontSize="2xl" fontWeight="bold">
            <CountUp
              isCounting
              end={Math.ceil(receiptCount * energyUsed)}
              duration={1.5}
            />{" "}
            <Text fontSize="md" fontWeight="bold">
              kWh
            </Text>
          </Text>
          <Text fontSize="xs">saved energy</Text>
        </Box>
      </Flex>

      <Flex
        justifyContent="space-between"
        height="150px"
        width="125px"
        borderRadius="20px"
        backgroundColor="blue.100"
        p={4}
      >
        <Circle backgroundColor="blue.400" size="40px">
          <Icon as={<Ionicons name="water-outline" />} color="white" size={5} />
        </Circle>
        <Box>
          <Text lineHeight="24px" fontSize="2xl" fontWeight="bold">
            <CountUp
              isCounting
              end={Math.ceil(receiptCount * waterUsed)}
              duration={1.5}
            />{" "}
            <Text fontSize="md" fontWeight="bold">
              ml
            </Text>
          </Text>
          <Text fontSize="xs">saved water</Text>
        </Box>
      </Flex>

      <Flex
        justifyContent="space-between"
        height="150px"
        width="125px"
        borderRadius="20px"
        backgroundColor="primary.100"
        p={4}
      >
        <Circle backgroundColor="primary.400" size="40px">
          <Icon as={<Entypo name="tree" />} color="white" size={5} />
        </Circle>
        <Box>
          <Text lineHeight="24px" fontSize="2xl" fontWeight="bold">
            <CountUp
              isCounting
              end={Math.ceil(receiptCount * woodUsed)}
              duration={1.5}
            />{" "}
            <Text fontSize="md" fontWeight="bold">
              g
            </Text>
          </Text>
          <Text fontSize="xs">saved wood</Text>
        </Box>
      </Flex>

      <Flex
        justifyContent="space-between"
        height="150px"
        width="125px"
        borderRadius="20px"
        backgroundColor="gray.100"
        p={4}
      >
        <Circle backgroundColor="gray.400" size="40px">
          <Icon as={<Entypo name="icloud" />} color="white" size={5} />
        </Circle>
        <Box>
          <Text lineHeight="24px" fontSize="2xl" fontWeight="bold">
            <CountUp
              isCounting
              end={Math.ceil(receiptCount * co2Used)}
              duration={1.5}
            />{" "}
            <Text fontSize="md" fontWeight="bold">
              g
            </Text>
          </Text>
          <Text fontSize="xs">of co2 emission</Text>
        </Box>
      </Flex>
    </HStack>
  );
};
