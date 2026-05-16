import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@ui/Text/AppText'
import { AppLoader } from '@ui/Loader/AppLoader'
import type { LoaderColor, LoaderSize, LoaderVariant } from '@ui/Loader'

const VARIANTS: LoaderVariant[] = ['spinner', 'dots', 'pulse']
const SIZES: LoaderSize[] = ['sm', 'md', 'lg']
const COLORS: LoaderColor[] = ['primary', 'neutral']

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

const LoaderPreviewScreen = () => {
    const { colors, spacing } = useTheme()

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl * 2 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Variants */}
            <SectionLabel>Variants</SectionLabel>
            <View style={s.row}>
                {VARIANTS.map(variant => (
                    <View key={variant} style={s.cell}>
                        <AppLoader variant={variant} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 10 }}>{variant}</AppText>
                    </View>
                ))}
            </View>

            {/* Sizes */}
            <SectionLabel>Sizes · Spinner</SectionLabel>
            <View style={s.row}>
                {SIZES.map(size => (
                    <View key={size} style={s.cell}>
                        <AppLoader variant="spinner" size={size} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 10 }}>{size}</AppText>
                    </View>
                ))}
            </View>

            <SectionLabel>Sizes · Dots</SectionLabel>
            <View style={s.row}>
                {SIZES.map(size => (
                    <View key={size} style={s.cell}>
                        <AppLoader variant="dots" size={size} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 10 }}>{size}</AppText>
                    </View>
                ))}
            </View>

            <SectionLabel>Sizes · Pulse</SectionLabel>
            <View style={s.row}>
                {SIZES.map(size => (
                    <View key={size} style={s.cell}>
                        <AppLoader variant="pulse" size={size} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 10 }}>{size}</AppText>
                    </View>
                ))}
            </View>

            {/* Colors */}
            <SectionLabel>Colors</SectionLabel>
            <View style={s.row}>
                {COLORS.map(color => (
                    <View key={color} style={s.cell}>
                        <AppLoader variant="spinner" color={color} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 10 }}>{color}</AppText>
                    </View>
                ))}
                {/* White on dark bg */}
                <View style={s.cell}>
                    <View style={{ backgroundColor: '#1F2937', borderRadius: 12, padding: 12 }}>
                        <AppLoader variant="spinner" color="white" />
                    </View>
                    <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 10 }}>white</AppText>
                </View>
            </View>

            {/* With label */}
            <SectionLabel>With Label</SectionLabel>
            <View style={s.row}>
                <AppLoader variant="spinner" label="Loading..." />
                <AppLoader variant="dots" label="Please wait" />
                <AppLoader variant="pulse" label="Syncing" />
            </View>

            {/* Real-world · Full screen overlay */}
            <SectionLabel>Real-world · Full Screen Style</SectionLabel>
            <View style={[s.fullscreenMock, { backgroundColor: colors.surface }]}>
                <AppLoader variant="spinner" size="lg" label="Fetching your data..." />
            </View>

            {/* Real-world · Inline button loader */}
            <SectionLabel>Real-world · Inline</SectionLabel>
            <View style={[s.inlineRow, { backgroundColor: colors.primary, borderRadius: 12 }]}>
                <AppLoader variant="spinner" size="sm" color="white" />
                <AppText style={{ color: '#fff', fontSize: 14, fontWeight: '600', marginLeft: 8 }}>
                    Processing...
                </AppText>
            </View>
        </ScrollView>
    )
}

export default LoaderPreviewScreen

const s = StyleSheet.create({
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end' },
    cell: { alignItems: 'center', minWidth: 64 },
    fullscreenMock: { height: 180, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    inlineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, paddingHorizontal: 24, alignSelf: 'flex-start' },
})