import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { DarbarUser } from '@types';

export interface AuthState {
  token: string | null;
  user: DarbarUser | null;
  isAuthenticated: boolean;
  authHasHydrated: boolean;
  hasCompletedOnboarding: boolean;
  setAuthHasHydrated: (val: boolean) => void;
  setAuth: (token: string, user: DarbarUser) => void;
  completeOnboarding: () => void;
  logout: () => void;
}

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set): AuthState => ({
      token: null,
      user: null,
      isAuthenticated: false,
      authHasHydrated: false,
      hasCompletedOnboarding: false,
      setAuthHasHydrated: (val) => set({ authHasHydrated: val }),
      setAuth: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),
      completeOnboarding: () =>
        set({
          hasCompletedOnboarding: true,
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          hasCompletedOnboarding: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage),
      onRehydrateStorage: () => (state) => {
        state?.setAuthHasHydrated(true);
      },
    },
  ),
);
