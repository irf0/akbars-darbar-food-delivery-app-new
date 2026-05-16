import { StyleSheet } from 'react-native'

export const createStyles = (colors: any, spacing: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: spacing.md,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        title: {
            flex: 1,
        },
        closeButton: {
            padding: spacing.xs,
        },
        content: {
            flex: 1,
            paddingVertical: spacing.md,
        },
        backdrop: {
            backgroundColor: colors.overlay,
        },
    })