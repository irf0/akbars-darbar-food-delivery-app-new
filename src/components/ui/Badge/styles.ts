import { StyleSheet } from 'react-native'
import type { Theme } from '@theme'
import { BADGE_COLOR_MAP, BADGE_SIZE_MAP } from './constants'
import type { BadgeColor, BadgeSize, BadgeVariant } from './types'

export const createBadgeStyles = (
    spacing: Theme['spacing'],
    fontSize: Theme['fontSize'],
    radius: Theme['radius'],
    fontFamily: Theme['fontFamily'],
    fontWeight: Theme['fontWeight'],
    variant: BadgeVariant,
    color: BadgeColor,
    size: BadgeSize,
) => {
    const sizeTokens = BADGE_SIZE_MAP[size]
    const colorTokens = BADGE_COLOR_MAP[color][variant]

    return StyleSheet.create({
        container: {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorTokens.bg,
            borderRadius: radius[sizeTokens.radius],
            borderWidth: variant === 'outlined' ? 1 : 0,
            borderColor: colorTokens.border,
            paddingHorizontal: spacing[sizeTokens.paddingHorizontal],
            paddingVertical: spacing[sizeTokens.paddingVertical],
        },
        label: {
            fontSize: fontSize[sizeTokens.fontSize],
            fontFamily: fontFamily.semibold,
            fontWeight: fontWeight.semibold as any,
            color: colorTokens.text,
            letterSpacing: 0.3,
        },
    })
}