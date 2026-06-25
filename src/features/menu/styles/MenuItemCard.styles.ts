import { theme } from '@theme'
import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        marginHorizontal: theme.spacing.lg,
        marginVertical: theme.spacing.sm,
        borderRadius: theme.radius.md,
        padding: theme.spacing.lg,
        ...theme.shadow.md,
    },
    cardUnavailable: {
        opacity: 0.5,
    },
    details: {
        flex: 1,
        paddingRight: theme.spacing.md,
    },
    dietDot: {
        width: 16,
        height: 16,
        borderWidth: 1.5,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
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
        fontSize: theme.fontSize.xs,
        color: theme.colors.secondary,
        fontWeight: theme.fontWeight.semibold,
        marginBottom: theme.spacing.xs,
    },
    name: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.bold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    price: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.semibold,
        color: theme.colors.text,
        marginBottom: theme.spacing.xs,
    },
    description: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textSecondary,
        lineHeight: 18,
    },
    unavailableText: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.text,
        marginTop: theme.spacing.xs,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: theme.layout.itemCardImageSize,
        height: theme.layout.itemCardImageSize,
        borderRadius: theme.radius.md,
    },
    addButton: {
        position: 'absolute',
        bottom: -12,
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.primary,
        borderWidth: 1.5,
        borderRadius: theme.radius.sm,
        paddingVertical: theme.spacing.xs,
        paddingHorizontal: theme.spacing.xl,
    },
    addButtonText: {
        color: theme.colors.primary,
        fontWeight: theme.fontWeight.bold,
        fontSize: theme.fontSize.sm,
    },
})