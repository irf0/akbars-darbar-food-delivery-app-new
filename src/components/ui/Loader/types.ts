import type { StyleProp, ViewStyle } from 'react-native'

export type LoaderSize = 'sm' | 'md' | 'lg'
export type LoaderVariant = 'spinner' | 'dots' | 'pulse'
export type LoaderColor = 'primary' | 'white' | 'neutral'

export interface LoaderProps {
    variant?: LoaderVariant
    size?: LoaderSize
    color?: LoaderColor
    label?: string
    style?: StyleProp<ViewStyle>
}