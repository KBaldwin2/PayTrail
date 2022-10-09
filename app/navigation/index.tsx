import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { RootStackParamList } from "../../types";
import useAuth from "../hooks/useAuth";
import useHasBeenOnboarding from "../hooks/useHasBeenOnboarded";
import NotFoundScreen from "../screens/NotFoundScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import ScanReceiptsScreen from "../screens/ScanReceiptScreen";
import { AuthStackScreen } from "./AuthStackNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { hasOnboarded, skipOnboarding } = useHasBeenOnboarding();
  const { user } = useAuth();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="Root"
        component={
          !hasOnboarded
            ? () => <OnboardingScreen onFinish={skipOnboarding} />
            : user?.isPhoneVerified
            ? BottomTabNavigator
            : AuthStackScreen
        }
      />
      <RootStack.Screen
        name="ScanReceiptsScreen"
        component={ScanReceiptsScreen}
      />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!", headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default RootNavigator;
