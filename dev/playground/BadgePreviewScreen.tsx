import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@ui/Text/AppText'
import { AppBadge } from '@ui/Badge/AppBadge'
import type { BadgeColor, BadgeSize, BadgeVariant } from '@ui/Badge'

const VARIANTS: BadgeVariant[] = ['filled', 'outlined', 'ghost']
const COLORS: BadgeColor[] = ['primary', 'success', 'warning', 'error', 'info', 'neutral']
const SIZES: BadgeSize[] = ['sm', 'md', 'lg']

const SectionLabel = ({ children }: { children: string }) => {
    const { colors, spacing, fontSize, fontFamily } = useTheme()
    return (
        <AppText
            style={{
                fontSize: fontSize.xs,
                fontFamily: fontFamily.semibold,
                color: colors.textSecondary,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                marginBottom: spacing.sm,
                marginTop: spacing.lg,
            }}
        >
            {children}
        </AppText>
    )
}

const BadgePreviewScreen = () => {
    const { colors, spacing } = useTheme()

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl * 2 }}
            showsVerticalScrollIndicator={false}
        >
            <AppText variant='h1' style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#111827",
            }} >Badges</AppText>
            {/* Variants × Colors */}
            {VARIANTS.map(variant => (
                <View key={variant}>
                    <SectionLabel>{variant}</SectionLabel>
                    <View style={s.row}>
                        {COLORS.map(color => (
                            <AppBadge
                                key={color}
                                label={color}
                                variant={variant}
                                color={color}
                            />
                        ))}
                    </View>
                </View>
            ))}

            {/* Sizes */}
            <SectionLabel>Sizes</SectionLabel>
            <View style={s.row}>
                {SIZES.map(size => (
                    <AppBadge key={size} label={size} size={size} color="primary" />
                ))}
            </View>

            {/* Real-world usage */}
            <SectionLabel>Real-world Usage</SectionLabel>

            <View style={s.usageRow}>
                <AppText style={{ color: colors.text }}>Order status</AppText>
                <AppBadge label="Delivered" color="success" variant="ghost" />
            </View>

            <View style={s.usageRow}>
                <AppText style={{ color: colors.text }}>Plan</AppText>
                <AppBadge label="Pro" color="primary" variant="filled" />
            </View>

            <View style={s.usageRow}>
                <AppText style={{ color: colors.text }}>Stock</AppText>
                <AppBadge label="Low Stock" color="warning" variant="outlined" />
            </View>

            <View style={s.usageRow}>
                <AppText style={{ color: colors.text }}>Account</AppText>
                <AppBadge label="Suspended" color="error" variant="filled" />
            </View>

            <View style={s.usageRow}>
                <AppText style={{ color: colors.text }}>Feature</AppText>
                <AppBadge label="Beta" color="info" variant="ghost" />
            </View>

            <View style={s.usageRow}>
                <AppText style={{ color: colors.text }}>Category</AppText>
                <AppBadge label="Design" color="neutral" variant="outlined" />
            </View>
        </ScrollView>
    )
}

export default BadgePreviewScreen

const s = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    usageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E5E7EB',
    },
})