// src/config/env.ts
export const ENV = {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL!,
    appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? "development",
    isDev: process.env.EXPO_PUBLIC_APP_ENV === "development",
};