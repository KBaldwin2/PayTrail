import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { Box, Flex, Image } from "native-base";
import * as React from "react";
import { View } from "react-native";
import useAuth from "../hooks/useAuth";
import { ForgotPasswordScreen } from "../screens/ForgotPasswordScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import VerifyPhoneScreen from "../screens/VerifyPhoneScreen";
import { AuthStackNavigationHandler } from "./AuthStackNavigationHandler";

const AuthStack = createMaterialTopTabNavigator();

export const AuthStackScreen = () => {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <AuthStack.Navigator
      tabBar={(props) => {
        return (
          <>
            {(activeIndex === 0 || activeIndex === 1) && (
              <Flex
                pt={4}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-end"
                px={6}
                backgroundColor="white"
              >
                <View
                  style={{
                    width: 155,
                  }}
                >
                  <MaterialTopTabBar {...props} />
                </View>
                <Image
                  alt="logo"
                  size="sm"
                  source={require("../assets/paytrail_logo_with_name.png")}
                />
              </Flex>
            )}
            <AuthStackNavigationHandler
              material={props}
              setIndex={setActiveIndex}
            />
          </>
        );
      }}
      tabBarOptions={{
        allowFontScaling: false,
        labelStyle: { fontSize: 14, textTransform: "none" },
        tabStyle: { width: "auto", marginTop: 40 },
        style: {
          backgroundColor: "white",
          shadowOpacity: 0,
          shadowColor: "transparent",
          shadowRadius: 0,
          elevation: 0,
        },
        indicatorStyle: { backgroundColor: "#2B5740" },
      }}
      initialRouteName={
        user && !user.isPhoneVerified ? "VerifyPhone" : "SignIn"
      }
    >
      <AuthStack.Screen
        options={{ title: "Login" }}
        name="SignIn"
        component={activeIndex === 0 ? LoginScreen : PlaceHolder}
      />

      <AuthStack.Screen
        options={{ title: "Sign Up" }}
        name="SignUp"
        component={activeIndex === 1 ? RegisterScreen : PlaceHolder}
      />

      <AuthStack.Screen
        options={{ title: "" }}
        name="Forgot"
        component={activeIndex === 2 ? ForgotPasswordScreen : PlaceHolder}
      />

      <AuthStack.Screen
        options={{ title: "" }}
        name="VerifyPhone"
        component={activeIndex === 3 ? VerifyPhoneScreen : PlaceHolder}
      />
    </AuthStack.Navigator>
  );
};

const PlaceHolder = () => {
  return <Box flex={1} backgroundColor="white"></Box>;
};
