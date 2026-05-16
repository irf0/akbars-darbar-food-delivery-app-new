import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import {
    DEFAULTS,
    DIVIDER_SPACING_MAP,
    LABEL_POSITION_FLEX,
} from './constants'
import { createDividerStyles } from './styles'
import type { DividerProps } from './types'

export const AppDivider: React.FC<DividerProps> = ({
    orientation = DEFAULTS.orientation,
    variant = DEFAULTS.variant,
    spacing = DEFAULTS.spacing,
    labelPosition = DEFAULTS.labelPosition,
    color,
    label,
    style,
}) => {
    const { colors, spacing: sp, fontSize, fontFamily, fontWeight } = useTheme()

    const styles = useMemo(
        () => createDividerStyles(colors, { fontSize, fontFamily, fontWeight }, color, variant),
        [colors, fontSize, fontFamily, fontWeight, color, variant],
    )

    // Resolve spacing token → actual number (0 is a valid value, not falsy-safe)
    const spacingValue = DIVIDER_SPACING_MAP[spacing]
    const resolvedSpacing = spacingValue === 0 ? 0 : sp[spacingValue as keyof typeof sp]

    const isHorizontal = orientation === 'horizontal'

    // ─── Vertical ────────────────────────────────────────────────────────────────
    if (!isHorizontal) {
        return (
            <View
                style={[
                    styles.verticalContainer,
                    { marginHorizontal: resolvedSpacing },
                    style,
                ]}
            // accessibilityRole="separator"
            >
                <View style={styles.verticalLine} />
            </View>
        )
    }

    // ─── Horizontal without label ─────────────────────────────────────────────
    if (!label) {
        return (
            <View
                style={[
                    styles.horizontalContainer,
                    { marginVertical: resolvedSpacing },
                    style,
                ]}
            // accessibilityRole="separator"
            >
                <View style={[styles.horizontalLine, { flex: 1 }]} />
            </View>
        )
    }

    // ─── Horizontal with label ────────────────────────────────────────────────
    const [leftFlex, rightFlex] = LABEL_POSITION_FLEX[labelPosition]

    return (
        <View
            style={[
                styles.horizontalContainer,
                { marginVertical: resolvedSpacing },
                style,
            ]}
        //   accessibilityRole="separator"
        >
            {/* Left line — hidden when labelPosition is 'left' */}
            {leftFlex > 0 && (
                <View style={[styles.horizontalLine, { flex: leftFlex }]} />
            )}

            <View style={styles.labelWrapper}>
                {typeof label === 'string' ? (
                    <Text style={styles.labelText}>{label}</Text>
                ) : (
                    label
                )}
            </View>

            {/* Right line — hidden when labelPosition is 'right' */}
            {rightFlex > 0 && (
                <View style={[styles.horizontalLine, { flex: rightFlex }]} />
            )}
        </View>
    )
}

