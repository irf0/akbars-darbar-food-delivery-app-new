import { theme } from '@theme'
import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: theme.light.colors.surface,
        marginHorizontal: theme.light.spacing.lg,
        marginVertical: theme.light.spacing.sm,
        borderRadius: theme.light.radius.md,
        padding: theme.light.spacing.lg,
        ...theme.light.shadow.md,
    },
    cardUnavailable: {
        opacity: 0.5,
    },
    details: {
        flex: 1,
        paddingRight: theme.light.spacing.md,
    },
    dietDot: {
        width: 16,
        height: 16,
        borderWidth: 1.5,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.light.spacing.xs,
    },
    dietBadgeContainer: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    dietDotInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    bestSeller: {
        fontSize: theme.light.fontSize.xs,
        color: theme.light.colors.secondary,
        fontWeight: theme.light.fontWeight.semibold,
        marginBottom: theme.light.spacing.xs,
    },
    name: {
        fontSize: theme.light.fontSize.md,
        fontWeight: theme.light.fontWeight.bold,
        color: theme.light.colors.text,
        marginBottom: theme.light.spacing.xs,
    },
    price: {
        fontSize: theme.light.fontSize.md,
        fontWeight: theme.light.fontWeight.semibold,
        color: theme.light.colors.text,
        marginBottom: theme.light.spacing.xs,
    },
    description: {
        fontSize: theme.light.fontSize.sm,
        color: theme.light.colors.textSecondary,
        lineHeight: 18,
    },
    unavailableText: {
        fontSize: theme.light.fontSize.sm,
        color: theme.light.colors.text,
        marginTop: theme.light.spacing.xs,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: theme.light.layout.itemCardImageSize,
        height: theme.light.layout.itemCardImageSize,
        borderRadius: theme.light.radius.md,
    },
    addButton: {
        position: 'absolute',
        bottom: -12,
        backgroundColor: theme.light.colors.surface,
        borderColor: theme.light.colors.primary,
        borderWidth: 1.5,
        borderRadius: theme.light.radius.sm,
        paddingVertical: theme.light.spacing.xs,
        paddingHorizontal: theme.light.spacing.xl,
    },
    addButtonText: {
        color: theme.light.colors.primary,
        fontWeight: theme.light.fontWeight.bold,
        fontSize: theme.light.fontSize.sm,
    },
})