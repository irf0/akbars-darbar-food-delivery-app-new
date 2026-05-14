import type { CardSize, CardVariant } from './types'

export const DEFAULTS = {
    variant: 'elevated' as CardVariant,
    size: 'md' as CardSize,
}

// Padding tokens per size — resolved against theme.spacing in styles
export const CARD_SIZE_PADDING: Record<CardSize, keyof import('@theme').Theme['spacing']> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
}

// Border radius tokens per size — resolved against theme.radius in styles
export const CARD_SIZE_RADIUS: Record<CardSize, keyof import('@theme').Theme['radius']> = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
}

// Which variants show a border
export const CARD_HAS_BORDER: Record<CardVariant, boolean> = {
    elevated: false,
    outlined: true,
    filled: false,
    ghost: false,
}

// Which variants show a shadow
export const CARD_HAS_SHADOW: Record<CardVariant, boolean> = {
    elevated: true,
    outlined: false,
    filled: false,
    ghost: false,
}

// Press animation scale
export const CARD_PRESS_SCALE = 0.98

export const CARD_ANIMATION_DURATION = 120