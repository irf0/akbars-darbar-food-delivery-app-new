import { create } from "zustand";
import { Appearance } from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface ThemeStore {
    mode: ThemeMode;
    resolved: "light" | "dark";   // what's actually applied
    setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    mode: "system",
    resolved: Appearance.getColorScheme() ?? "light",

    setMode: (mode) => {
        const resolved =
            mode === "system"
                ? (Appearance.getColorScheme() ?? "light")
                : mode;
        set({ mode, resolved });
    },
}));