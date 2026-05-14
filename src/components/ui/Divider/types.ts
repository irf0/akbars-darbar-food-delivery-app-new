import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerVariant = 'solid' | 'dashed' | 'dotted'
export type DividerSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg'
export type DividerLabelPosition = 'left' | 'center' | 'right'

export interface DividerProps {
    orientation?: DividerOrientation
    variant?: DividerVariant
    spacing?: DividerSpacing
    color?: string
    label?: ReactNode
    labelPosition?: DividerLabelPosition
    style?: StyleProp<ViewStyle>
}