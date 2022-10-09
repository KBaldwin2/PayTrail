import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import useAuth from "./useAuth";
import useHasBeenOnboarding from "./useHasBeenOnboarded";
import useSkipEmail from "./useSkipEmail";

export default function useCachedResources() {
  const { loadUserFromStorage } = useAuth();
  const { loadSkipEmailAddressFromStorage } = useSkipEmail();
  const { loadOnboardedFromStorage } = useHasBeenOnboarding();
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await loadOnboardedFromStorage();
        await loadSkipEmailAddressFromStorage();
        await loadUserFromStorage();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
