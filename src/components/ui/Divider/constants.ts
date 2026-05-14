import type { DividerLabelPosition, DividerOrientation, DividerSpacing, DividerVariant } from './types'

// Maps to theme.spacing keys — resolved in the component via useTheme()
export const DIVIDER_SPACING_MAP: Record<DividerSpacing, keyof import('@theme').Theme['spacing'] | 0> = {
    none: 0,
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
} as const

// Thickness of the divider line in logical pixels
export const DIVIDER_THICKNESS = 1

export const DIVIDER_LABEL_GAP = 8 // px between the line and the label text

export const DEFAULTS = {
    orientation: 'horizontal' as DividerOrientation,
    variant: 'solid' as DividerVariant,
    spacing: 'md' as DividerSpacing,
    labelPosition: 'center' as DividerLabelPosition,
} as const

// Flex weights that drive label positioning
// The two line segments on either side of the label get these flex values.
export const LABEL_POSITION_FLEX: Record<DividerLabelPosition, [number, number]> = {
    left: [0, 1],   // short left segment, long right segment
    center: [1, 1],   // equal
    right: [1, 0],   // long left segment, short right segment
}