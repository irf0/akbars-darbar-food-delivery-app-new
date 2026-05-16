export const SKELETON_ANIMATION_DURATION = 1000  // ms for one shimmer pass
export const SKELETON_ANIMATION_MIN_OPACITY = 0.3
export const SKELETON_ANIMATION_MAX_OPACITY = 1

// Default dimensions per variant
export const SKELETON_DEFAULTS = {
    rect: { width: '100%' as const, height: 120, radius: 8 },
    circle: { width: 48, height: 48, radius: 24 },
    text: { width: '100%' as const, height: 14, radius: 4 },
}

// Last line of text variant is shorter to look natural
export const SKELETON_LAST_LINE_WIDTH = '60%'

// Gap between text lines
export const SKELETON_LINE_GAP = 8