import type { ModalSize } from './types'

export const MODAL_DEFAULTS = {
    size: 'md' as ModalSize,
    closeOnBackdrop: true,
    showCloseBtn: true,
}

export const MODAL_ANIMATION_DURATION = 250

// Width as percentage of screen width per size
export const MODAL_SIZE_MAP: Record<ModalSize, {
    widthPercent: number    // 0–1
    maxWidth: number    // px cap
    borderRadius: number
    padding: number
}> = {
    sm: { widthPercent: 0.75, maxWidth: 320, borderRadius: 20, padding: 20 },
    md: { widthPercent: 0.88, maxWidth: 480, borderRadius: 24, padding: 24 },
    lg: { widthPercent: 0.95, maxWidth: 600, borderRadius: 24, padding: 24 },
    full: { widthPercent: 1, maxWidth: 9999, borderRadius: 0, padding: 24 },
}

export const ACTION_COLORS = {
    primary: { bg: '#6366F1', text: '#fff', border: '#6366F1' },
    outline: { bg: 'transparent', text: '#1F2937', border: '#E5E7EB' },
    ghost: { bg: 'transparent', text: '#6B7280', border: 'transparent' },
    destructive: { bg: '#EF4444', text: '#fff', border: '#EF4444' },
}