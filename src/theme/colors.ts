
//Each new project - we change just this file.

const palette = {
    // Brand — swap these per project
    purple50: "#F5F3FF",
    purple100: "#EDE9FE",
    purple500: "#6C63FF",
    purple600: "#5B52E5",
    purple700: "#4A42CC",

    // Neutrals
    white: "#FFFFFF",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray700: "#374151",
    gray900: "#111827",
    black: "#000000",

    // Semantic
    green500: "#22C55E",
    green100: "#DCFCE7",
    red500: "#EF4444",
    red100: "#FEE2E2",
    yellow500: "#EAB308",
    yellow100: "#FEF9C3",
    blue500: "#3B82F6",
    blue100: "#DBEAFE",
};

export const lightColors = {
    // Brand
    primary: palette.purple500,
    primaryDark: palette.purple600,
    primaryLight: palette.purple50,
    secondary: palette.blue500,

    // Backgrounds
    background: palette.white,
    surface: palette.gray50,
    surfaceAlt: palette.gray100,

    // Text
    text: palette.gray900,
    textSecondary: palette.gray500,
    textDisabled: palette.gray300,
    textInverse: palette.white,

    // Border
    border: palette.gray200,
    borderFocus: palette.purple500,

    // Status
    success: palette.green500,
    successBg: palette.green100,
    error: palette.red500,
    errorBg: palette.red100,
    warning: palette.yellow500,
    warningBg: palette.yellow100,
    info: palette.blue500,
    infoBg: palette.blue100,

    // Misc
    overlay: "rgba(0,0,0,0.5)",
    shadow: palette.black,
};

export const darkColors: typeof lightColors = {
    primary: palette.purple500,
    primaryDark: palette.purple600,
    primaryLight: palette.purple700,
    secondary: palette.blue500,

    background: palette.black,
    surface: "#080a0c",
    surfaceAlt: "#374151",

    text: palette.gray50,
    textSecondary: palette.gray400,
    textDisabled: palette.gray500,
    textInverse: palette.gray900,

    border: palette.gray700,
    borderFocus: palette.purple500,

    success: palette.green500,
    successBg: "#14532D",
    error: palette.red500,
    errorBg: "#7F1D1D",
    warning: palette.yellow500,
    warningBg: "#713F12",
    info: palette.blue500,
    infoBg: "#1E3A5F",

    overlay: "rgba(0,0,0,0.7)",
    shadow: palette.black,
};