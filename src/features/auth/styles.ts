// styles.ts
import { StyleSheet } from 'react-native'
import { theme } from 'src/theme'

const t = theme

export const shopClosedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: t.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    // Decorative arcs
    arc: {
        position: 'absolute',
        top: -120,
        width: 420,
        height: 300,
        borderRadius: 210,
        backgroundColor: t.colors.primary,
        opacity: 0.06,
    },
    arcBottom: {
        position: 'absolute',
        bottom: -140,
        width: 460,
        height: 300,
        borderRadius: 230,
        backgroundColor: t.colors.primary,
        opacity: 0.06,
    },

    content: {
        alignItems: 'center',
        paddingHorizontal: t.spacing.xl,
    },

    emoji: {
        fontSize: 72,
        marginBottom: t.spacing.lg,
    },

    title: {
        fontSize: t.fontSize.xxl + 4,
        fontWeight: t.fontWeight.bold,
        color: t.colors.text,
        textAlign: 'center',
        lineHeight: 38,
        marginBottom: t.spacing.md,
    },

    subtitle: {
        fontSize: t.fontSize.base,
        color: t.colors.textSecondary,
        textAlign: 'center',
        lineHeight: t.lineHeight.base + 4,
        marginBottom: t.spacing.xl,
    },

    // Hours card
    hoursCard: {
        backgroundColor: t.colors.surface,
        borderRadius: t.radius.lg,
        paddingVertical: t.spacing.lg,
        paddingHorizontal: t.spacing.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: t.colors.border,
        marginBottom: t.spacing.xl,
        width: '100%',
        ...t.shadow.sm,
    },
    hoursLabel: {
        fontSize: t.fontSize.sm,
        color: t.colors.textSecondary,
        marginBottom: t.spacing.xs,
        fontWeight: t.fontWeight.medium,
    },
    hoursTime: {
        fontSize: t.fontSize.xxl + 6,
        fontWeight: t.fontWeight.bold,
        color: t.colors.primary,
        letterSpacing: 1,
    },
    hoursSubLabel: {
        fontSize: t.fontSize.xs,
        color: t.colors.textSecondary,
        marginTop: t.spacing.xs,
    },

    footer: {
        fontSize: t.fontSize.sm,
        color: t.colors.textSecondary,
        textAlign: 'center',
    },
})