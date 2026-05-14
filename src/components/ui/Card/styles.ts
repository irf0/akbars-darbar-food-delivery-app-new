import { StyleSheet } from 'react-native'
import type { Theme } from '@theme'
import {
    CARD_HAS_BORDER,
    CARD_HAS_SHADOW,
    CARD_SIZE_PADDING,
    CARD_SIZE_RADIUS,
} from './constants'
import type { CardSize, CardVariant } from './types'

export const createCardStyles = (
    colors: Theme['colors'],
    spacing: Theme['spacing'],
    radius: Theme['radius'],
    shadow: Theme['shadow'],
    variant: CardVariant,
    size: CardSize,
) => {
    const pad = spacing[CARD_SIZE_PADDING[size]]
    const rad = radius[CARD_SIZE_RADIUS[size]]
    const border = CARD_HAS_BORDER[variant]
    const shade = CARD_HAS_SHADOW[variant]

    const bgMap: Record<CardVariant, string> = {
        elevated: colors.surface,
        outlined: 'transparent',
        filled: colors.surfaceAlt,
        ghost: 'transparent',
    }

    return StyleSheet.create({
        card: {
            backgroundColor: bgMap[variant],
            borderRadius: rad,
            overflow: 'hidden',
            ...(border && {
                borderWidth: 1,
                borderColor: colors.border,
            }),
            ...(shade && shadow.md),
        },
        body: {
            padding: pad,
        },
        footer: {
            paddingHorizontal: pad,
            paddingBottom: pad,
            paddingTop: spacing.xs,
            flexDirection: 'row',
            alignItems: 'center',
        },
        footerDivider: {
            borderTopWidth: 1,
            borderTopColor: colors.border,
        },
        title: {
            marginBottom: spacing.xs,
        },
        subtitle: {
            marginBottom: spacing.sm,
        },
        image: {
            width: '100%',
        },
    })
}