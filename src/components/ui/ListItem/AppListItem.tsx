import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@components/ui/Text/AppText'
import { ListItemProps } from './types'
import { createStyles } from './styles'

export const AppListItem = ({
    title,
    subtitle,
    leftElement,
    rightElement,
    showChevron = false,
    onPress,
    variant = 'default',
    showBorder = true,
    disabled = false,
    style,
}: ListItemProps) => {
    const { colors, spacing } = useTheme()
    const styles = createStyles(colors, spacing)

    const isDestructive = variant === 'destructive'
    const titleColor = isDestructive ? 'error' : 'text'

    const Container = onPress ? TouchableOpacity : View

    return (
        <Container
            style={[
                styles.container,
                showBorder && styles.bordered,
                disabled && styles.disabled,
                style,
            ]}
            onPress={disabled ? undefined : onPress}
            activeOpacity={0.6}
        >
            {/* Left */}
            {leftElement && (
                <View style={styles.left}>
                    {leftElement}
                </View>
            )}

            {/* Content */}
            <View style={styles.content}>
                <AppText
                    variant='body'
                    weight='medium'
                    color={titleColor}
                    numberOfLines={1}
                >
                    {title}
                </AppText>
                {subtitle && (
                    <AppText
                        variant='caption'
                        color='textSecondary'
                        numberOfLines={1}
                    >
                        {subtitle}
                    </AppText>
                )}
            </View>

            {/* Right */}
            <View style={styles.right}>
                {rightElement}
                {showChevron && (
                    <Ionicons
                        name='chevron-forward'
                        size={18}
                        color={colors.textSecondary}
                    />
                )}
            </View>
        </Container>
    )
}