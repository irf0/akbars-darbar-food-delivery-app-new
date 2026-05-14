import { WithSpringConfig } from "react-native-reanimated";
import { ButtonSize, ButtonVariant, SizeToken } from "./types";
import { Theme } from "../../../theme";
import { ViewStyle } from "react-native";

export const SPRING_CONFIG: WithSpringConfig = {
    damping: 10,
    stiffness: 400,
    mass: 0.5,
};

export const PRESS_SCALE = 0.96;

export const getSizeTokens = (
    spacing: Theme["spacing"],
    fontSize: Theme["fontSize"]
): Record<ButtonSize, SizeToken> => ({
    sm: {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        fontSize: fontSize.sm,
        iconSize: 14,
        gap: spacing.xs,
    },
    md: {
        paddingVertical: spacing.md + 2,
        paddingHorizontal: spacing.lg,
        fontSize: fontSize.base,
        iconSize: 18,
        gap: spacing.sm,
    },
    lg: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        fontSize: fontSize.lg,
        iconSize: 22,
        gap: spacing.sm,
    },
});

export const getVariantContainerStyles = (
    colors: Theme["colors"],
    disabled: boolean
): Record<ButtonVariant, ViewStyle> => ({
    solid: {
        backgroundColor: disabled ? colors.border : colors.primary,
        borderWidth: 0,
    },
    outline: {
        backgroundColor: "transparent",
        borderWidth: 1.5,
        borderColor: disabled ? colors.border : colors.primary,
    },
    ghost: {
        backgroundColor: "transparent",
        borderWidth: 0,
    },
    danger: {
        backgroundColor: disabled ? colors.border : colors.error,
        borderWidth: 0,
    },
});

export const VARIANT_TEXT_COLOR: Record<ButtonVariant, string> = {
    solid: "textInverse",
    outline: "primary",
    ghost: "primary",
    danger: "textInverse",
};