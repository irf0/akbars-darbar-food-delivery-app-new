import type { LoaderColor, LoaderSize, LoaderVariant } from './types'

export const DEFAULTS = {
    variant: 'spinner' as LoaderVariant,
    size: 'md' as LoaderSize,
    color: 'primary' as LoaderColor,
}

export const LOADER_SIZE_MAP: Record<LoaderSize, {
    spinnerSize: number
    dotSize: number
    dotGap: number
    fontSize: number
    labelGap: number
}> = {
    sm: { spinnerSize: 20, dotSize: 6, dotGap: 5, fontSize: 12, labelGap: 8 },
    md: { spinnerSize: 32, dotSize: 8, dotGap: 6, fontSize: 14, labelGap: 10 },
    lg: { spinnerSize: 48, dotSize: 12, dotGap: 8, fontSize: 16, labelGap: 12 },
}

export const LOADER_COLOR_MAP: Record<LoaderColor, string> = {
    primary: '#6366F1',
    white: '#FFFFFF',
    neutral: '#9CA3AF',
}

// Animation durations in ms
export const SPINNER_DURATION = 800
export const DOT_DURATION = 400
export const PULSE_DURATION = 900
export const DOT_COUNT = 3