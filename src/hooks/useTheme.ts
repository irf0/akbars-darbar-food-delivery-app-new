import { theme, Theme } from "@theme/index";
import { useThemeStore } from "@store/themeStore";

export const useTheme = (): Theme => {
    const { resolved } = useThemeStore();
    return theme[resolved];
};