import type { StyleProp, ViewStyle } from 'react-native'

export type BadgeVariant = 'filled' | 'outlined' | 'ghost'
export type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
    label: string
    variant?: BadgeVariant
    color?: BadgeColor
    size?: BadgeSize
    style?: StyleProp<ViewStyle>
}