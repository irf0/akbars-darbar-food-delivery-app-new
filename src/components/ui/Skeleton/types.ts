import type { StyleProp, ViewStyle } from 'react-native'

export type SkeletonVariant = 'rect' | 'circle' | 'text'

export interface SkeletonProps {
    variant?: SkeletonVariant
    width?: number | `${number}%`
    height?: number
    radius?: number
    lines?: number        // text variant only — number of lines to render
    style?: StyleProp<ViewStyle>
}