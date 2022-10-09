import { format } from "date-fns/esm";
import { Badge, Flex, Stack, Text } from "native-base";
import { TouchableHighlight } from "react-native";
import { IAd } from "../../../../../../models/ad";

interface IProps {
  ad: IAd;
  onViewAdd: (ad: IAd) => void;
}

export const AdListItem = ({ ad, onViewAdd }: IProps) => {
  return (
    <TouchableHighlight onPress={() => onViewAdd(ad)}>
      <Flex
        flexDirection="row"
        backgroundColor="white"
        px={6}
        py={5}
        alignItems="flex-start"
        borderTopWidth="1px"
        borderTopColor="gray.200"
        justifyContent="space-between"
      >
        <Stack flexGrow={1} space={0}>
          <Text fontSize="lg">{ad.title}</Text>
          <Text fontSize="xs" color="gray.500">
            {ad.receivedDate ? format(new Date(ad.receivedDate), "PP") : ""}
          </Text>
        </Stack>
        {!ad.hasViewed && <Badge colorScheme="primary">NEW</Badge>}
      </Flex>
    </TouchableHighlight>
  );
};
