import create from "zustand";
import * as SecureStore from "expo-secure-store";

interface ISkipEmailStore {
  hasUserSkippedEmailAddress: boolean;
  skipEmailAddress: () => Promise<void>;
  reset: () => void;
  loadSkipEmailAddressFromStorage: () => Promise<void>;
}

const useSkipEmail = create<ISkipEmailStore>((set) => ({
  skipEmailAddress: async () => {
    set({ hasUserSkippedEmailAddress: true });
    try {
      await SecureStore.setItemAsync("skipEmail", "true");
    } catch (err) {
      console.log("Error storing the skipEmail token", err);
    }
  },
  reset: async () => {
    set({ hasUserSkippedEmailAddress: false });
    try {
      await SecureStore.setItemAsync("skipEmail", "false");
    } catch (err) {
      console.log("Error storing the skipEmail token", err);
    }
  },
  hasUserSkippedEmailAddress: false,
  loadSkipEmailAddressFromStorage: async () => {
    const hasSkipped = await SecureStore.getItemAsync("skipEmail");
    set({
      hasUserSkippedEmailAddress:
        !hasSkipped || hasSkipped === "false" ? false : true,
    });
  },
}));

export default useSkipEmail;
