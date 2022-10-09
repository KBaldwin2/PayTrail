import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Box, Divider, Icon, ScrollView, Stack, Text } from "native-base";
import * as React from "react";
import Screen from "../../components/Screen";
import { DeleteAccount } from "./components/DeleteAccount";
import { Logout } from "./components/Logout/Logout";
import { ManageEmail } from "./components/ManageEmail/ManageEmail";
import { ManageName } from "./components/ManageName/ManageName";
import { ManagePassword } from "./components/ManagePassword/ManagePassword";
import { ManagePhoneNumber } from "./components/ManagePhoneNumber";
import { SettingsHeader } from "./components/SettingsHeader/SettingsHeader";
import { SettingsMenuItem } from "./components/SettingsMenuItem/SettingsMenuItem";
import Constants from "expo-constants";

export default function SettingsScreen() {
  return (
    <Screen>
      <ScrollView flexGrow={1} my={4} display="flex">
        <Stack
          px={4}
          flexGrow={1}
          space={6}
          divider={<Divider bgColor="gray.300" />}
        >
          <Box>
            <SettingsHeader title="Account Management" />
            <Stack mt={3} space={4}>
              <ManageName />
              <ManageEmail />
              <ManagePassword />
              <ManagePhoneNumber />
              <DeleteAccount />
            </Stack>
          </Box>

          <Box>
            <SettingsHeader title="About" />
            <Stack mt={3} space={4}>
              <SettingsMenuItem
                onPress={async () => {
                  await WebBrowser.openBrowserAsync(
                    "https://mypaytrail.com/feedback/"
                  );
                }}
                icon={
                  <Icon
                    as={<MaterialCommunityIcons name="comment-edit-outline" />}
                    size={5}
                    color="gray.500"
                  />
                }
                title="Feedback"
              />
              <SettingsMenuItem
                onPress={async () => {
                  await WebBrowser.openBrowserAsync(
                    "https://mypaytrail.com/terms-conditions/"
                  );
                }}
                icon={
                  <Icon
                    as={<Feather name="book" />}
                    color="gray.500"
                    size={5}
                  />
                }
                title="Terms of Service"
              />
              <SettingsMenuItem
                onPress={async () => {
                  await WebBrowser.openBrowserAsync(
                    "https://mypaytrail.com/privacy-policy/"
                  );
                }}
                icon={
                  <Icon
                    as={<Feather name="file" />}
                    color="gray.500"
                    size={5}
                  />
                }
                title="Privacy Policy"
              />
              <SettingsMenuItem
                onPress={async () => {
                  await WebBrowser.openBrowserAsync(
                    "https://mypaytrail.com/app-help/"
                  );
                }}
                icon={
                  <Icon
                    as={<Feather name="life-buoy" />}
                    color="gray.500"
                    size={5}
                  />
                }
                title="Support"
              />
            </Stack>
          </Box>

          <Box>
            <SettingsHeader title="Login" />
            <Stack mt={3} space={4}>
              <Logout />
            </Stack>
          </Box>
        </Stack>
        <Text mt={4} mb={10} textAlign="center" color="gray.500">
          v{Constants?.manifest?.version}
        </Text>
      </ScrollView>
    </Screen>
  );
}
