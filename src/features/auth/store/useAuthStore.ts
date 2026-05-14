// src/features/auth/store/useAuthStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store'
import { AuthState } from "./types";

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
            hasHydrated: false,
            hasCompletedOnboarding: false,
            setHasHydrated: (val) => set({ hasHydrated: val }),
            setAuth: (token, user) => set({
                token,
                user,
                isAuthenticated: true,
            }),
            completeOnboarding: () => set({
                hasCompletedOnboarding: true,
            }),
            logout: () => set({
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
                state?.setHasHydrated(true)
            },
        }
    )
);