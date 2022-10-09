import jwtDecode, { JwtPayload } from "jwt-decode";
import create from "zustand";
import { User, UserInfo } from "../models/user";
import storage from "../utility/storage";

interface IUseAuthStore {
  user: User | null;
  loadUserFromStorage: () => Promise<void>;
  setUser: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

type JwtUser = JwtPayload & UserInfo;

const useAuth = create<IUseAuthStore>((set) => ({
  user: null,
  loadUserFromStorage: async () => {
    let token = await storage.getToken();
    if (token) {
      const { exp = 0, ...currentUser } = jwtDecode<JwtUser>(token);
      if (Date.now() < exp * 1000) {
        await storage.storeToken(token);
        set({
          user: {
            ...currentUser,
            token,
          },
        });
      } else {
        await storage.removeToken();
      }
    }
  },
  setUser: async (token: string) => {
    const currentUser = jwtDecode<UserInfo>(token);
    await storage.storeToken(token);
    set({
      user: {
        ...currentUser,
        token,
      },
    });
  },
  logout: async () => {
    set({ user: null });
    await storage.removeToken();
  },
}));

export default useAuth;
