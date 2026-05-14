import { Theme } from "@theme/index";

export const getInputContainerStyle = (colors: Theme["colors"]) => ({
    default: colors.border,
    focused: colors.borderFocus,
    error: colors.error,
    disabled: colors.border,
})

export const FOCUS_ANIMATION = {
    duration: 300,
}

export const DISABLED_OPACITY = 0.8