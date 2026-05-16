import { StyleSheet } from 'react-native'
import type { Theme } from '@theme'
import { EMPTY_STATE_SIZE_MAP } from './constants'
import type { EmptyStateSize } from './types'

export const createEmptyStateStyles = (
    colors: Theme['colors'],
    spacing: Theme['spacing'],
    size: EmptyStateSize,
) => {
    const tokens = EMPTY_STATE_SIZE_MAP[size]

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacing.xl,
            gap: tokens.gap,
        },
        iconWrapper: {
            width: tokens.iconSize * 1.8,
            height: tokens.iconSize * 1.8,
            borderRadius: (tokens.iconSize * 1.8) / 2,
            backgroundColor: colors.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing.xs,
        },
        icon: {
            fontSize: tokens.iconSize,
        },
        image: {
            width: tokens.imageSize,
            height: tokens.imageSize,
            marginBottom: spacing.xs,
        },
        title: {
            fontSize: tokens.titleSize,
            color: colors.text,
            textAlign: 'center',
        },
        subtitle: {
            fontSize: tokens.subtitleSize,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: tokens.subtitleSize * 1.6,
        },
        actionsRow: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: spacing.sm,
            marginTop: spacing.xs,
            width: '100%',
        },
        actionBtn: {
            width: '100%',
            paddingVertical: spacing.sm,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        primaryBtn: {
            backgroundColor: colors.primary,
        },
        outlineBtn: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.border,
        },
        ghostBtn: {
            backgroundColor: 'transparent',
        },
        primaryBtnText: {
            color: '#fff',
        },
        outlineBtnText: {
            color: colors.text,
        },
        ghostBtnText: {
            color: colors.primary,
        },
    })
}