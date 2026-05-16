import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'

export type EmptyStateSize = 'sm' | 'md' | 'lg'

export interface EmptyStateAction {
    label: string
    onPress: () => void
    variant?: 'primary' | 'outline' | 'ghost'
}

export interface EmptyStateProps {
    icon?: string                // emoji or text icon
    image?: ImageSourcePropType  // illustration image
    title: string
    subtitle?: string
    action?: EmptyStateAction
    secondAction?: EmptyStateAction
    size?: EmptyStateSize
    style?: StyleProp<ViewStyle>
}