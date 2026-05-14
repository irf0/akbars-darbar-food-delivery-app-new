import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from '@ui/Divider/Divider'
import { useTheme } from '@hooks/useTheme'

const DividerPreviewScreen = () => {
    const { colors, spacing, fontSize, fontFamily } = useTheme()

    const s = styles(colors, spacing, fontSize, fontFamily)

    return (
        <View style={s.container}>

            {/* Horizontal – default */}
            <Text style={s.label}>Default</Text>
            <Divider />

            {/* Horizontal – dashed */}
            <Text style={s.label}>Dashed</Text>
            <Divider variant="dashed" />

            {/* Horizontal – dotted */}
            <Text style={s.label}>Dotted</Text>
            <Divider variant="dotted" />

            {/* With label – center */}
            <Text style={s.label}>Label · center</Text>
            <Divider label="OR" />

            {/* With label – left */}
            <Text style={s.label}>Label · left</Text>
            <Divider label="OR" labelPosition="left" />

            {/* With label – right */}
            <Text style={s.label}>Label · right</Text>
            <Divider label="OR" labelPosition="right" />

            {/* Custom color */}
            <Text style={s.label}>Custom color</Text>
            <Divider color={colors.primary} />

            {/* Spacing variants */}
            <Text style={s.label}>Spacing · xs</Text>
            <Divider spacing="xs" />
            <Text style={s.label}>Spacing · lg</Text>
            <Divider spacing="lg" />

            {/* Vertical */}
            <Text style={s.label}>Vertical</Text>
            <View style={s.verticalRow}>
                <Text style={s.rowText}>Left</Text>
                <Divider orientation="vertical" spacing="sm" />
                <Text style={s.rowText}>Middle</Text>
                <Divider orientation="vertical" spacing="sm" />
                <Text style={s.rowText}>Right</Text>
            </View>

        </View>
    )
}

export default DividerPreviewScreen

const styles = (colors: any, spacing: any, fontSize: any, fontFamily: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: spacing.lg,
            gap: spacing.xs,
        },
        label: {
            fontSize: fontSize.xs,
            fontFamily: fontFamily.medium,
            color: colors.textSecondary,
            marginTop: spacing.sm,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
        },
        verticalRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
            paddingVertical: spacing.sm,
        },
        rowText: {
            fontSize: fontSize.sm,
            fontFamily: fontFamily.regular,
            color: colors.text,
        },
    })