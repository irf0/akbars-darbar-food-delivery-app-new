import type { ToastType } from './types'

export const TOAST_DEFAULTS = {
    type: 'neutral' as ToastType,
    duration: 3000,
    position: 'top' as const,
}

export const TOAST_ANIMATION_DURATION = 300
export const TOAST_OFFSET = 56   // px from top/bottom edge

export const TOAST_COLOR_MAP: Record<ToastType, {
    bg: string
    border: string
    icon: string
    text: string
}> = {
    success: { bg: '#F0FDF4', border: '#22C55E', icon: '✓', text: '#15803D' },
    error: { bg: '#FEF2F2', border: '#EF4444', icon: '✕', text: '#DC2626' },
    warning: { bg: '#FFFBEB', border: '#F59E0B', icon: '!', text: '#D97706' },
    info: { bg: '#EFF6FF', border: '#3B82F6', icon: 'i', text: '#2563EB' },
    neutral: { bg: '#1F2937', border: '#1F2937', icon: '•', text: '#FFFFFF' },
}