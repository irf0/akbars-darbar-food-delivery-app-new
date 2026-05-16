import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'

export type HeaderVariant = 'default' | 'transparent' | 'elevated' | 'colored'

export interface HeaderAction {
    icon: ReactNode
    onPress: () => void
    badge?: number | boolean
    disabled?: boolean
    accessibilityLabel?: string
}

export interface AppHeaderProps {
    title?: string
    subtitle?: string
    titleAlign?: 'left' | 'center'
    titleComponent?: ReactNode
    variant?: HeaderVariant
    backgroundColor?: string
    showBorder?: boolean
    leftAction?: HeaderAction
    rightActions?: HeaderAction[]
    style?: ViewStyle
}