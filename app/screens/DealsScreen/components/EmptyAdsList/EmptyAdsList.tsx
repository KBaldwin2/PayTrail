import { Feather } from "@expo/vector-icons";
import { Box, Center, Circle, Flex, Heading, Icon, Text } from "native-base";
import { DotPattern } from "../../../../components/patterns/DotPattern";

export const EmptyAdsList = () => {
  return (
    <Flex mt={12} justifyContent="center" alignItems="center">
      <Box mx={4}>
        <Center py={10} px={8} mt={10} rounded="md" position="relative">
          <Heading textAlign="center" fontSize="3xl" mb={8}>
            No Deals Yet
          </Heading>

          <Circle
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="primary.100"
            size={150}
          >
            <Icon
              as={Feather}
              name="tag"
              size={100}
              ml={4}
              mt={4}
              color="primary.800"
            />
          </Circle>

          <Text
            fontSize="md"
            textAlign="center"
            mb={4}
            fontWeight="700"
            mt={10}
          >
            What will be on this page?
          </Text>
          <Text fontSize="md" textAlign="center" mb={10}>
            Find emails and promotions from our retail partners!
          </Text>

          <Box position="absolute" right="-175px" bottom="-77px">
            <DotPattern
              color="primary.800"
              opacity="0.8"
              width="250px"
              height="150px"
            />
          </Box>
        </Center>
      </Box>
    </Flex>
  );
};
