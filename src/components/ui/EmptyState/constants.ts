import type { EmptyStateSize } from './types'

export const DEFAULTS = {
    size: 'md' as EmptyStateSize,
}

export const EMPTY_STATE_SIZE_MAP: Record<EmptyStateSize, {
    iconSize: number
    imageSize: number
    titleSize: number
    subtitleSize: number
    gap: number
}> = {
    sm: { iconSize: 36, imageSize: 120, titleSize: 15, subtitleSize: 13, gap: 8 },
    md: { iconSize: 52, imageSize: 160, titleSize: 18, subtitleSize: 14, gap: 12 },
    lg: { iconSize: 72, imageSize: 200, titleSize: 22, subtitleSize: 16, gap: 16 },
}