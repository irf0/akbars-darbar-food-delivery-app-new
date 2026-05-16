import React, { useMemo } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { DEFAULTS } from './constants'
import { createEmptyStateStyles } from './styles'
import type { EmptyStateAction, EmptyStateProps } from './types'

const ActionButton = ({
    action,
    styles,
    fontFamily,
    fontSize,
}: {
    action: EmptyStateAction
    styles: ReturnType<typeof createEmptyStateStyles>
    fontFamily: any
    fontSize: any
}) => {
    const variant = action.variant ?? 'primary'

    const btnStyle = {
        primary: styles.primaryBtn,
        outline: styles.outlineBtn,
        ghost: styles.ghostBtn,
    }[variant]

    const textStyle = {
        primary: styles.primaryBtnText,
        outline: styles.outlineBtnText,
        ghost: styles.ghostBtnText,
    }[variant]

    return (
        <TouchableOpacity
            onPress={action.onPress}
            activeOpacity={0.8}
            style={[styles.actionBtn, btnStyle]}
        >
            <Text style={[{ fontFamily: fontFamily.semibold, fontSize: fontSize.md }, textStyle]}>
                {action.label}
            </Text>
        </TouchableOpacity>
    )
}

export const AppEmptyState: React.FC<EmptyStateProps> = ({
    icon,
    image,
    title,
    subtitle,
    action,
    secondAction,
    size = DEFAULTS.size,
    style,
}) => {
    const { colors, spacing, fontFamily, fontSize, fontWeight } = useTheme()

    const styles = useMemo(
        () => createEmptyStateStyles(colors, spacing, size),
        [colors, spacing, size],
    )

    return (
        <View style={[styles.container, style]}>
            {/* Icon or image */}
            {image ? (
                <Image source={image} style={styles.image} resizeMode="contain" />
            ) : icon ? (
                <View style={styles.iconWrapper}>
                    <Text style={styles.icon}>{icon}</Text>
                </View>
            ) : null}

            {/* Text */}
            <Text style={[styles.title, { fontFamily: fontFamily.bold, fontWeight: fontWeight.bold as any }]}>
                {title}
            </Text>

            {subtitle && (
                <Text style={[styles.subtitle, { fontFamily: fontFamily.regular }]}>
                    {subtitle}
                </Text>
            )}

            {/* Actions */}
            {(action || secondAction) && (
                <View style={styles.actionsRow}>
                    {action && (
                        <ActionButton
                            action={action}
                            styles={styles}
                            fontFamily={fontFamily}
                            fontSize={fontSize}
                        />
                    )}
                    {secondAction && (
                        <ActionButton
                            action={{ ...secondAction, variant: secondAction.variant ?? 'ghost' }}
                            styles={styles}
                            fontFamily={fontFamily}
                            fontSize={fontSize}
                        />
                    )}
                </View>
            )}
        </View>
    )
}

export default AppEmptyState