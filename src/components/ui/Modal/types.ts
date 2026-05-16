import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type ModalSize = 'sm' | 'md' | 'lg' | 'full'

export interface ModalAction {
    label: string
    onPress: () => void
    variant?: 'primary' | 'outline' | 'ghost' | 'destructive'
    loading?: boolean
    disabled?: boolean
}

export interface ModalProps {
    visible: boolean
    onClose: () => void
    title?: string
    subtitle?: string
    size?: ModalSize
    closeOnBackdrop?: boolean      // dismiss on backdrop tap — default true
    showCloseBtn?: boolean        // X button in header — default true
    primaryAction?: ModalAction
    secondaryAction?: ModalAction
    children?: ReactNode
    style?: StyleProp<ViewStyle>
}