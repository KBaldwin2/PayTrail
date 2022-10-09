import {
  AntDesign,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Box, Flex, Icon } from "native-base";
import { IReceiptCategory } from "../../../../../../models/receiptCategory";

interface IProps {
  receiptCategory: IReceiptCategory;
}

export const ItemIcon = ({ receiptCategory }: IProps) => {
  let icon = (
    <Icon as={Ionicons} name="wallet-outline" size={6} color="gray.800" />
  );
  let color = "gray.200";
  switch (receiptCategory?.description) {
    case "Groceries":
      icon = (
        <Icon as={AntDesign} name="shoppingcart" size={5} color="blue.600" />
      );
      color = "blue.100";
      break;
    case "Home":
      icon = (
        <Icon
          as={FontAwesome5}
          name="home"
          size={5}
          mr="2px"
          color="lightBlue.600"
        />
      );
      color = "lightBlue.100";
      break;
    case "Health & Fitness":
      icon = (
        <Icon
          as={Ionicons}
          name="fitness-outline"
          mt="2px"
          ml="1px"
          size={6}
          color="red.700"
        />
      );
      color = "red.200";
      break;
    case "Business":
      icon = (
        <Icon
          as={Ionicons}
          name="briefcase-outline"
          size={6}
          color="emerald.800"
        />
      );
      color = "emerald.200";
      break;
    case "Entertainment & Hobbies":
      icon = (
        <Icon
          as={MaterialIcons}
          name="sports-tennis"
          size={6}
          color="purple.500"
        />
      );
      color = "purple.100";
      break;
    case "Restaurants & Dining Out":
      icon = (
        <Icon as={FontAwesome5} name="utensils" size={5} color="green.600" />
      );
      color = "green.100";
      break;
    case "Clothing & Retail":
      icon = (
        <Icon as={Feather} name="shopping-bag" size={5} color="purple.800" />
      );
      color = "purple.200";
      break;
    case "Electronics":
      icon = (
        <Icon as={Feather} name="headphones" size={5} color="orange.800" />
      );
      color = "orange.200";
      break;
    case "Holidays & Travel":
      icon = (
        <Icon
          as={Ionicons}
          name="airplane-outline"
          size={6}
          ml="2px"
          color="lime.700"
        />
      );
      color = "lime.200";
      break;
    case "Transportation & Auto":
      icon = (
        <Icon as={Ionicons} name="car-outline" size={6} color="orange.500" />
      );
      color = "orange.100";
      break;
    case "Children":
      icon = (
        <Icon as={MaterialIcons} name="toys" size={6} color="yellow.500" />
      );
      color = "yellow.100";
      break;
    case "Pets":
      icon = <Icon as={MaterialIcons} name="pets" size={6} color="amber.500" />;
      color = "amber.100";
      break;
    case "Bills":
      icon = (
        <Icon as={MaterialIcons} name="payment" size={6} color="primary.800" />
      );
      color = "primary.200";
      break;
    case "Retaurants & Dining Out":
      icon = (
        <Icon
          as={MaterialCommunityIcons}
          name="silverware-fork-knife"
          size={5}
          color="cyan.500"
        />
      );
      color = "cyan.100";
      break;
    case "Medical Expenses":
      icon = (
        <Icon
          as={MaterialCommunityIcons}
          name="pill"
          size={6}
          color="red.500"
        />
      );
      color = "red.100";
      break;
    case "Subscriptions":
      icon = (
        <Icon
          as={MaterialCommunityIcons}
          name="email-plus-outline"
          ml="2px"
          size={6}
          color="indigo.500"
        />
      );
      color = "indigo.100";
      break;
    case "Gifts":
      icon = <Icon as={Feather} name="gift" size={6} color="pink.500" />;
      color = "pink.100";
      break;
  }

  return (
    <Flex
      backgroundColor={color}
      borderRadius="10px"
      justifyContent="center"
      alignItems="center"
      size="40px"
    >
      {icon}
    </Flex>
  );
};
