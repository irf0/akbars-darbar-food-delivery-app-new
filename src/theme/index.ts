import { lightColors, darkColors } from "./colors";
import { fontFamily, fontSize, lineHeight, fontWeight } from "./typography";
import { spacing, radius, shadow } from "./spacing";

export const theme = {
    light: {
        colors: lightColors,
        fontFamily,
        fontSize,
        lineHeight,
        fontWeight,
        spacing,
        radius,
        shadow,
    },
    dark: {
        colors: darkColors,
        fontFamily,
        fontSize,
        lineHeight,
        fontWeight,
        spacing,
        radius,
        shadow,
    },
};

export type Theme = typeof theme.light;
export type Colors = typeof lightColors;