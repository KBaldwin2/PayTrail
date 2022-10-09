import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { isThisMonth } from "date-fns";
import {
  Alert,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Stack,
  Text,
  useDisclose,
} from "native-base";
import { TouchableOpacity } from "react-native";
import ActivityIndicator from "../../components/ActivityIndicator";
import { Button } from "../../components/Button";
import { DotPattern } from "../../components/patterns/DotPattern";
import Screen from "../../components/Screen";
import { ServerError } from "../../components/ServerError/ServerError";
import useAuth from "../../hooks/useAuth";
import { FileCategoryEnum } from "../../models/fileDetail";
import { useReceiptsGetAll } from "../../services/receipts/queries/useReceiptsGetAll";
import { EmailInfoModal } from "./components/EmailInfoModal/EmailInfoModal";
import { PayTrailEmail } from "./components/PayTrailEmail";
import { ProfileCompletion } from "./components/ProfileCompletion/ProfileCompletion";
import { SavingStats } from "./components/SavingStats/SavingStats";
import { SpendingBreakdown } from "./components/SpendingBreakdown";
import { TotalReceipts } from "./components/TotalReceipts/TotalReceipts";
import { UpdateEmail } from "./components/UpdateEmail";

export default function HomeScreen() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { user } = useAuth();
  const { isLoadingReceipts, receipts, errorReceipts } = useReceiptsGetAll();
  const totalReceiptCount = (receipts ?? []).length;
  const digitalReceiptCount = (receipts ?? []).filter(
    (x) =>
      x.fileDetail?.fileCategory === FileCategoryEnum.HTML ||
      x.fileDetail?.fileCategory === FileCategoryEnum.PDF
  ).length;
  const navigation = useNavigation();
  let profileCompletedPercentage =
    50 +
    (user?.isPhoneVerified ? 25 : 0) +
    ((receipts ?? []).length > 0 ? 25 : 0);
  const isProfileCompleted = profileCompletedPercentage === 100;
  const receiptsThisMonth = (receipts ?? []).filter(
    (x) => isThisMonth(new Date(x.date)) && x.total
  );

  let greeting = "Good Evening, ";

  if (new Date().getHours() < 12) {
    greeting = "Good Morning,";
  } else if (new Date().getHours() < 18) {
    greeting = "Good Afternoon,";
  }

  return (
    <Screen>
      <UpdateEmail />
      <ActivityIndicator visible={isLoadingReceipts} />
      <ServerError message={errorReceipts?.toString()} />
      {!isLoadingReceipts && (
        <ScrollView>
          <Stack pb={4} height="100%" space={8} px={4} display="flex">
            <Box>
              <Heading color="black" size="lg" fontWeight="700" mt={6}>
                {greeting}
              </Heading>
              <Heading size="lg" fontWeight="700" color="primary.800">
                {user?.name} 👋
              </Heading>
            </Box>
            <Box position="relative">
              {!isProfileCompleted ? (
                <ProfileCompletion
                  receipts={receipts!}
                  user={user!}
                  profileCompletedPercentage={profileCompletedPercentage}
                />
              ) : (
                <Box zIndex={2}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Receipts");
                    }}
                  >
                    <TotalReceipts
                      digitalReceiptCount={digitalReceiptCount}
                      totalReceiptCount={totalReceiptCount}
                    />
                  </TouchableOpacity>
                </Box>
              )}
              <Box position="absolute" left="-10px" bottom="-16px">
                <DotPattern
                  size="4xl"
                  color="primary.800"
                  opacity="0.7"
                  width="100px"
                  height="100px"
                />
              </Box>
            </Box>
            <Heading mt={6} size="lg">
              Saving Stats
            </Heading>
            <Box mr={-4}>
              <ScrollView horizontal>
                <SavingStats
                  profileCompleted={isProfileCompleted}
                  receiptCount={digitalReceiptCount}
                />
              </ScrollView>
            </Box>

            <Flex
              mt={6}
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <EmailInfoModal isOpen={isOpen} onClose={onClose} />
              <Heading size="lg">Your PayTrail Email</Heading>
              <IconButton
                onPress={onOpen}
                width="44px"
                height="44px"
                icon={
                  <Icon
                    as={<Feather name="info" />}
                    size={7}
                    color="primary.800"
                  />
                }
              />
            </Flex>
            <PayTrailEmail />

            {!!(receiptsThisMonth ?? []).length && (
              <Box mt={6} pb={8}>
                <Heading mb={-10} size="lg">
                  Spending Breakdown
                </Heading>
                <SpendingBreakdown receiptsThisMonth={receiptsThisMonth} />
              </Box>
            )}
          </Stack>
        </ScrollView>
      )}
    </Screen>
  );
}
