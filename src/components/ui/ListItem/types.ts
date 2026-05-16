import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'

export type ListItemVariant = 'default' | 'destructive'

export interface ListItemProps {
    title: string
    subtitle?: string
    leftElement?: ReactNode
    rightElement?: ReactNode
    showChevron?: boolean
    onPress?: () => void
    variant?: ListItemVariant
    showBorder?: boolean
    disabled?: boolean
    style?: ViewStyle
}