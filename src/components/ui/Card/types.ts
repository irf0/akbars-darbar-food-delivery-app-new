import type { ReactNode } from 'react'
import type { ImageSourcePropType, StyleProp, ViewStyle, ImageStyle } from 'react-native'

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost'
export type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps {
    variant?: CardVariant
    size?: CardSize
    onPress?: () => void
    disabled?: boolean
    style?: StyleProp<ViewStyle>
    children?: ReactNode
}

export interface CardImageProps {
    source: ImageSourcePropType
    aspectRatio?: number
    style?: StyleProp<ImageStyle>
}

export interface CardBodyProps {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}

export interface CardFooterProps {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}

export interface CardTitleProps {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}

export interface CardSubtitleProps {
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}