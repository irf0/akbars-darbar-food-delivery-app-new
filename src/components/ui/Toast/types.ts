import type { StyleProp, ViewStyle } from 'react-native'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'neutral'
export type ToastPosition = 'top' | 'bottom'

export interface ToastConfig {
    id?: string
    type?: ToastType
    title: string
    subtitle?: string
    duration?: number        // ms — 0 means persist until dismissed
    position?: ToastPosition
    action?: { label: string; onPress: () => void }
    onDismiss?: () => void
}

export interface ToastProps extends ToastConfig {
    onHide: () => void
    style?: StyleProp<ViewStyle>
}

// What the global store holds
export interface ToastState {
    toasts: ToastConfig[]
    show: (config: ToastConfig) => void
    hide: (id: string) => void
    hideAll: () => void
}