import { StyleSheet } from 'react-native'
import { AVATAR_RADIUS_MAP, AVATAR_SIZE_MAP, PRESENCE_COLOR_MAP } from './constants'
import type { AvatarPresence, AvatarSize, AvatarVariant } from './types'

export const createAvatarStyles = (
    size: AvatarSize,
    variant: AvatarVariant,
    presence: AvatarPresence | undefined,
    bgColor: string,
    surfaceColor: string,
) => {
    const { box, fontSize, presenceDot, borderWidth } = AVATAR_SIZE_MAP[size]
    const borderRadius = box * AVATAR_RADIUS_MAP[variant]

    return StyleSheet.create({
        container: {
            width: box,
            height: box,
            position: 'relative',
        },
        image: {
            width: box,
            height: box,
            borderRadius,
        },
        fallback: {
            width: box,
            height: box,
            borderRadius,
            backgroundColor: bgColor,
            justifyContent: 'center',
            alignItems: 'center',
        },
        initials: {
            fontSize,
            fontWeight: '600',
            color: '#FFFFFF',
            letterSpacing: 0.5,
        },
        presenceDot: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: presenceDot,
            height: presenceDot,
            borderRadius: presenceDot / 2,
            backgroundColor: presence ? PRESENCE_COLOR_MAP[presence] : 'transparent',
            borderWidth,
            borderColor: surfaceColor,
        },
        badgeWrapper: {
            position: 'absolute',
            top: -2,
            right: -2,
        },
    })
}