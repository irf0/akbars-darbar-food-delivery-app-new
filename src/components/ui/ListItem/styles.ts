import { StyleSheet } from 'react-native'

export const createStyles = (colors: any, spacing: any) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 56,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            backgroundColor: colors.surface,
            gap: spacing.sm,
        },
        bordered: {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
        },
        disabled: {
            opacity: 0.4,
        },
        left: {
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            flex: 1,
            justifyContent: 'center',
            gap: 2,
        },
        right: {
            alignItems: 'center',
            justifyContent: 'center',
        },
    })