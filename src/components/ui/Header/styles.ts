import { StyleSheet } from 'react-native'
import { HEADER_HEIGHT } from './constants'

export const createStyles = (colors: any, spacing: any) =>
    StyleSheet.create({
        container: {
            height: HEADER_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing.sm,
            backgroundColor: colors.background,
        },
        bordered: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
        },
        elevated: {
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 4,
            elevation: 4,
        },
        transparent: {
            backgroundColor: 'transparent',
        },
        left: {
            width: 44,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        center: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        centerLeft: {
            flex: 1,
            justifyContent: 'center',
            paddingLeft: spacing.xs,
        },
        right: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 4,
        },
        actionButton: {
            width: 36,
            height: 36,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 18,
        },
        actionDisabled: {
            opacity: 0.4,
        },
        badgeWrapper: {
            position: 'relative',
        },
        badge: {
            position: 'absolute',
            top: 2,
            right: 2,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 3,
        },
        badgeText: {
            fontSize: 10,
            fontWeight: '700',
            color: '#fff',
        },
    })