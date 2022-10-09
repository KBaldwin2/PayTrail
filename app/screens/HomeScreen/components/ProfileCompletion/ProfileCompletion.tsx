import { Box, Circle, Flex, Square, Text } from "native-base";
import React from "react";
import AnimatedProgressWheel from "react-native-progress-wheel";
import { CountUp } from "use-count-up";
import { IReceipt } from "../../../../models/receipt";
import { User } from "../../../../models/user";

interface IProps {
  profileCompletedPercentage: number;
  receipts: IReceipt[];
  user: User;
}

export const ProfileCompletion = ({
  profileCompletedPercentage,
  receipts,
  user,
}: IProps) => {
  return (
    <Box
      zIndex={2}
      position="relative"
      borderRadius="20px"
      backgroundColor="primary.800"
      p={5}
      overflow="hidden"
    >
      <Flex alignItems="center" flexDirection="row" position="relative">
        <Circle zIndex={2} height="55px" width="55px" position="absolute">
          <Text fontSize="sm" fontWeight="600">
            <CountUp
              isCounting
              end={profileCompletedPercentage}
              duration={1.5}
            />
            %
          </Text>
        </Circle>
        <Circle
          backgroundColor="white"
          style={{ transform: [{ rotate: "270deg" }] }}
          height="55px"
          width="55px"
        >
          <AnimatedProgressWheel
            size={50}
            width={5}
            color="#73BA95"
            progress={profileCompletedPercentage}
            backgroundColor={"transparent"}
          />
        </Circle>
        <Text color="white" ml={4} fontSize="xl" fontWeight="bold">
          {user?.isPhoneVerified
            ? "Enter your First Receipt"
            : "Setup PayTrail Email"}
        </Text>
      </Flex>
      <Text color="white" mt={4}>
        {user?.isPhoneVerified
          ? "Press + and press Scan or Enter Receipt"
          : "Press + and press 'PayTrail Email"}
      </Text>
    </Box>
  );
};
