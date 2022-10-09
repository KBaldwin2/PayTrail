import {
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/en";
import { Center, Image, NativeBaseProvider, Text } from "native-base";
import React, { useEffect } from "react";
import { Alert, Linking, LogBox, Platform } from "react-native";
import "react-native-gesture-handler";
import "react-native-get-random-values";
import { QueryClient, QueryClientProvider } from "react-query";
import * as Sentry from "sentry-expo";
import config from "./app.json";
import { LoadingIndicator } from "./app/components/LoadingIndicator/LoadingIndicator";
import useCachedResources from "./app/hooks/useCachedResources";
import RootNavigator from "./app/navigation";
import theme from "./theme";
import Constants from "expo-constants";
import apiClient from "./app/api/client";

Sentry.init({
  dsn: "https://94f63f2b6e0e43b29427dae9a2d9833a@o1034098.ingest.sentry.io/6008217",
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

// Ignore Nativebase Log warning
LogBox.ignoreLogs(["NativeBase: "]);

const queryClient = new QueryClient({});

const nativeBaseConfig = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
  });
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    const compareVersions = async () => {
      const version = Constants?.manifest?.version;
      const versionArray = version?.split(".");
      try {
        const response = await apiClient.get<{ version: string }>("/version");
        if (
          response.status === 200 &&
          response.data &&
          (versionArray ?? []).length === 3
        ) {
          const serverVersionArray = response.data.version?.split(".");
          console.log("serverVersionArray", serverVersionArray);
          console.log("versionArray", versionArray);
          if (
            +serverVersionArray[0] > +versionArray![0] ||
            +serverVersionArray[1] > +versionArray![1]
          ) {
            Alert.alert(
              "Update Available",
              "Please update the app to continue using it.",
              [
                {
                  text: "Not now",
                },
                {
                  text: "Update",
                  onPress: () => {
                    if (Platform.OS === "ios") {
                      Linking.openURL(
                        "https://apps.apple.com/us/app/paytrail/id1613229889"
                      );
                    } else {
                      Linking.openURL(
                        "https://play.google.com/store/apps/details?id=com.mypaytrail.app"
                      );
                    }
                  },
                },
              ]
            );
          }
        }
      } catch (err) {}
    };

    compareVersions();
  }, []);

  if (!isLoadingComplete || !fontsLoaded) {
    return (
      <NativeBaseProvider theme={theme}>
        <Center flex={1}>
          <Image
            mb={2}
            alt="logo"
            size="xl"
            source={require("./app/assets/paytrail_logo_with_name.png")}
          />
          <LoadingIndicator />
        </Center>
      </NativeBaseProvider>
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    );
  }
}
