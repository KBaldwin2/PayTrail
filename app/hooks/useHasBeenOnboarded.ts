import create from "zustand";
import * as SecureStore from "expo-secure-store";

interface IOnboardStore {
  hasOnboarded: boolean;
  skipOnboarding: () => Promise<void>;
  reset: () => void;
  loadOnboardedFromStorage: () => Promise<void>;
}

const useHasBeenOnboarding = create<IOnboardStore>((set) => ({
  skipOnboarding: async () => {
    set({ hasOnboarded: true });
    try {
      await SecureStore.setItemAsync("hasOnboarded", "true");
    } catch (err) {
      console.log("Error storing the hasOnboarded token", err);
    }
  },
  reset: async () => {
    set({ hasOnboarded: false });
    try {
      await SecureStore.setItemAsync("hasOnboarded", "false");
    } catch (err) {
      console.log("Error storing the hasOnboarded token", err);
    }
  },
  hasOnboarded: false,
  loadOnboardedFromStorage: async () => {
    const hasOnboarded = await SecureStore.getItemAsync("hasOnboarded");
    set({
      hasOnboarded: !hasOnboarded || hasOnboarded === "false" ? false : true,
    });
  },
}));

export default useHasBeenOnboarding;
