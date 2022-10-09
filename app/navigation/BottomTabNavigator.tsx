/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Feather, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AddIcon, Box, Circle, Icon, IconButton, Text } from "native-base";
import * as React from "react";
import {
  BottomTabParamList,
  DealsParamList,
  HomeParamList,
  ReceiptsParamList,
  SettingsParamList,
} from "../../types";
import AddReceiptsScreen from "../screens/AddReceiptsScreen";
import DealsScreen from "../screens/DealsScreen";
import HomeScreen from "../screens/HomeScreen";
import ReceiptsScreen from "../screens/ReceiptsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { useAdsGetUnreadCount } from "../services/ads/queries/useAdsGetUnreadCount";
import { ActionButton } from "./components/ActionButton";
import { resetBottomTabStacksOnTabPress } from "./utils/resetBottomTabStacksOnTabPress";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const { unreadAdsCount } = useAdsGetUnreadCount();

  return (
    <>
      <ActionButton />
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#2B5740",
          showLabel: true,
          allowFontScaling: false,
          style: {
            elevation: 0,
            shadowOpacity: 0,
            shadowColor: "white",
          },
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={SimpleLineIcons} name="home" size={5} color={color} />
            ),
            tabBarLabel: ({ color }) => (
              <Text color={color} fontSize="9px">
                Home
              </Text>
            ),
          }}
          listeners={resetBottomTabStacksOnTabPress}
        />
        <BottomTab.Screen
          name="Receipts"
          component={ReceiptsNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon
                pl="2px"
                mr={10}
                as={FontAwesome5}
                name="receipt"
                size={5}
                color={color}
              />
            ),
            tabBarLabel: ({ color }) => (
              <Text color={color} mr={10} fontSize="9px">
                Receipts
              </Text>
            ),
          }}
          listeners={resetBottomTabStacksOnTabPress}
        />
        <BottomTab.Screen
          name="Deals"
          component={DealsNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Box ml={10} position="relative">
                <Icon as={Feather} name="tag" size={5} color={color} />
                {(unreadAdsCount?.count ?? 0) > 0 && (
                  <Circle
                    right="0"
                    top="0"
                    position="absolute"
                    size="8px"
                    backgroundColor="red.700"
                    borderWidth="1px"
                    borderColor="white"
                  />
                )}
              </Box>
            ),
            tabBarLabel: ({ color }) => (
              <Text color={color} ml={10} fontSize="9px">
                Deals
              </Text>
            ),
          }}
          listeners={resetBottomTabStacksOnTabPress}
        />
        <BottomTab.Screen
          name="Settings"
          component={SettingsNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={Feather} name="menu" size={5} color={color} />
            ),
            tabBarLabel: ({ color }) => (
              <Text color={color} fontSize="9px">
                Settings
              </Text>
            ),
          }}
          listeners={resetBottomTabStacksOnTabPress}
        />
      </BottomTab.Navigator>
    </>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

const ReceiptsStack = createStackNavigator<ReceiptsParamList>();

function ReceiptsNavigator() {
  return (
    <ReceiptsStack.Navigator>
      <ReceiptsStack.Screen
        name="ReceiptsScreen"
        options={({ navigation }) => ({
          title: "My Receipts",
          headerStyle: {
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          },
          headerRight: () => (
            <IconButton
              mr={2}
              icon={<AddIcon size={5} />}
              onPress={async () => {
                navigation.navigate("Receipts", {
                  screen: "AddReceiptsScreen",
                  params: {
                    imgUri: undefined,
                    receipt: undefined,
                    initView: false,
                  },
                });
              }}
            />
          ),
        })}
        component={ReceiptsScreen}
      />
      <ReceiptsStack.Screen
        name="AddReceiptsScreen"
        component={AddReceiptsScreen}
        options={{
          headerTintColor: "black",
          headerBackTitleVisible: false,
          title: "Add Receipt",
        }}
      />
    </ReceiptsStack.Navigator>
  );
}

const DealsStack = createStackNavigator<DealsParamList>();

function DealsNavigator() {
  return (
    <DealsStack.Navigator>
      <DealsStack.Screen
        name="DealsScreen"
        component={DealsScreen}
        options={({ navigation }) => ({
          title: "Deals for Me",
          headerStyle: {
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
              width: 0,
            },
          },
        })}
      />
    </DealsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}
