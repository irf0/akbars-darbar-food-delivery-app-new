import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { DEFAULTS } from './constants'
import { createBadgeStyles } from './styles'
import type { BadgeProps } from './types'

export const AppBadge: React.FC<BadgeProps> = ({
    label,
    variant = DEFAULTS.variant,
    color = DEFAULTS.color,
    size = DEFAULTS.size,
    style,
}) => {
    const { spacing, fontSize, radius, fontFamily, fontWeight } = useTheme()

    const styles = useMemo(
        () => createBadgeStyles(spacing, fontSize, radius, fontFamily, fontWeight, variant, color, size),
        [spacing, fontSize, radius, fontFamily, fontWeight, variant, color, size],
    )

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}

