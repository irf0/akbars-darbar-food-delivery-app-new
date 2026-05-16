import type { AvatarPresence, AvatarSize, AvatarVariant } from './types'

export const DEFAULTS = {
    size: 'md' as AvatarSize,
    variant: 'circle' as AvatarVariant,
}

// px dimensions per size
export const AVATAR_SIZE_MAP: Record<AvatarSize, {
    box: number   // width & height of the avatar
    fontSize: number   // initials font size
    presenceDot: number   // dot indicator diameter
    borderWidth: number   // dot border width
}> = {
    xs: { box: 28, fontSize: 10, presenceDot: 8, borderWidth: 1.5 },
    sm: { box: 36, fontSize: 13, presenceDot: 10, borderWidth: 1.5 },
    md: { box: 48, fontSize: 16, presenceDot: 12, borderWidth: 2 },
    lg: { box: 64, fontSize: 22, presenceDot: 14, borderWidth: 2 },
    xl: { box: 88, fontSize: 30, presenceDot: 16, borderWidth: 2.5 },
}

// border-radius multiplier per variant (applied to box size)
export const AVATAR_RADIUS_MAP: Record<AvatarVariant, number> = {
    circle: 0.5,    // box * 0.5 = perfect circle
    rounded: 0.2,    // box * 0.2 = soft corners
    square: 0.05,   // box * 0.05 = almost sharp
}

// presence dot colors — static, not theme-dependent
export const PRESENCE_COLOR_MAP: Record<AvatarPresence, string> = {
    online: '#22C55E',
    offline: '#9CA3AF',
    away: '#F59E0B',
    busy: '#EF4444',
}

// fallback background colors for initials avatars (cycled by index or name hash)
export const AVATAR_FALLBACK_COLORS = [
    '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B',
    '#10B981', '#3B82F6', '#EF4444', '#14B8A6',
]