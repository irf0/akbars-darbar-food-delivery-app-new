const palette = {
    // Brand — Darbar Red
    red50: '#FFF0F0',
    red100: '#FFD6D6',
    red500: '#A90303',
    red600: '#8F0202',
    red700: '#750202',

    // Neutrals
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray700: '#374151',
    gray900: '#111827',
    black: '#000000',

    // Semantic
    green500: '#22C55E',
    green100: '#DCFCE7',
    red500sem: '#EF4444',
    red100sem: '#FEE2E2',
    yellow500: '#EAB308',
    yellow100: '#FEF9C3',
    blue500: '#3B82F6',
    blue100: '#DBEAFE',
}

export const lightColors = {
    // Brand
    primary: palette.red500,
    primaryDark: palette.red600,
    primaryLight: palette.red50,
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
    borderFocus: palette.red500,

    // Status
    success: palette.green500,
    successBg: palette.green100,
    error: palette.red500sem,
    errorBg: palette.red100sem,
    warning: palette.yellow500,
    warningBg: palette.yellow100,
    info: palette.blue500,
    infoBg: palette.blue100,

    // Misc
    overlay: 'rgba(0,0,0,0.5)',
    shadow: palette.black,
}

