import { theme, Theme } from "@theme";
import { useThemeStore } from "@store/theme/themeStore";

export const useTheme = (): Theme => {
    const { resolved } = useThemeStore();
    return theme[resolved];
};