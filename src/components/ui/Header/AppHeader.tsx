import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@components/ui/Text/AppText'
import { AppHeaderProps, HeaderAction } from './types'
import { createStyles } from './styles'
import { MAX_RIGHT_ACTIONS } from './constants'

// ─── Action Button ─────────────────────────────────────────────────────────────
const ActionButton = ({
    action,
    badgeColor,
}: {
    action: HeaderAction
    badgeColor: string
}) => {
    const styles = createStyles({}, {})

    return (
        <TouchableOpacity
            onPress={action.onPress}
            disabled={action.disabled}
            style={[
                styles.actionButton,
                action.disabled && styles.actionDisabled,
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityLabel={action.accessibilityLabel}
        >
            <View style={styles.badgeWrapper}>
                {action.icon}
                {/* Numeric badge */}
                {typeof action.badge === 'number' && action.badge > 0 && (
                    <View style={[styles.badge, { backgroundColor: badgeColor }]}>
                        <Text style={styles.badgeText}>
                            {action.badge > 99 ? '99+' : action.badge}
                        </Text>
                    </View>
                )}
                {/* Dot badge */}
                {action.badge === true && (
                    <View
                        style={[
                            styles.badge,
                            {
                                backgroundColor: badgeColor,
                                minWidth: 8,
                                height: 8,
                                top: 4,
                                right: 4,
                            },
                        ]}
                    />
                )}
            </View>
        </TouchableOpacity>
    )
}

// ─── AppHeader ─────────────────────────────────────────────────────────────────
export const AppHeader = ({
    title,
    subtitle,
    titleAlign = 'center',
    titleComponent,
    variant = 'default',
    backgroundColor,
    showBorder = false,
    leftAction,
    rightActions = [],
    style,
}: AppHeaderProps) => {
    const { colors, spacing } = useTheme()
    const styles = createStyles(colors, spacing)

    // limit to MAX_RIGHT_ACTIONS
    const actions = rightActions.slice(0, MAX_RIGHT_ACTIONS)

    const containerStyle = [
        styles.container,
        showBorder && styles.bordered,
        variant === 'elevated' && styles.elevated,
        variant === 'transparent' && styles.transparent,
        variant === 'colored' && backgroundColor
            ? { backgroundColor }
            : null,
        style,
    ]

    return (
        <View style={containerStyle}>
            {/* Left */}
            <View style={styles.left}>
                {leftAction && (
                    <ActionButton
                        action={leftAction}
                        badgeColor={colors.error}
                    />
                )}
            </View>

            {/* Center */}
            <View
                style={
                    titleAlign === 'left'
                        ? styles.centerLeft
                        : styles.center
                }
            >
                {titleComponent ?? (
                    <>
                        {title && (
                            <AppText
                                variant='h4'
                                weight='semibold'
                                numberOfLines={1}
                            >
                                {title}
                            </AppText>
                        )}
                        {subtitle && (
                            <AppText
                                variant='caption'
                                color='textSecondary'
                                numberOfLines={1}
                            >
                                {subtitle}
                            </AppText>
                        )}
                    </>
                )}
            </View>

            {/* Right */}
            <View style={styles.right}>
                {actions.map((action, index) => (
                    <ActionButton
                        key={index}
                        action={action}
                        badgeColor={colors.error}
                    />
                ))}
            </View>
        </View>
    )
}