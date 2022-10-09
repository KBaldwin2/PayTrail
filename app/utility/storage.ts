import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { STORAGE_TOKEN_KEY } from "../../constants";

const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(STORAGE_TOKEN_KEY, authToken);
  } catch (err) {
    console.log("Error storing the auth token", err);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(STORAGE_TOKEN_KEY);
  } catch (err) {
    console.log("Error getting the auth token", err);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(STORAGE_TOKEN_KEY);
  } catch (err) {
    console.log("Error removing the auth token", err);
  }
};

export default { getToken, storeToken, removeToken };
