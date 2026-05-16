import type { Theme } from '@theme'
import type { BadgeColor, BadgeSize, BadgeVariant } from './types'

export const DEFAULTS = {
    variant: 'filled' as BadgeVariant,
    color: 'primary' as BadgeColor,
    size: 'md' as BadgeSize,
}

export const BADGE_SIZE_MAP: Record<BadgeSize, {
    paddingHorizontal: keyof Theme['spacing']
    paddingVertical: keyof Theme['spacing']
    fontSize: keyof Theme['fontSize']
    radius: keyof Theme['radius']
}> = {
    sm: { paddingHorizontal: 'xs', paddingVertical: 'xs', fontSize: 'xs', radius: 'full' },
    md: { paddingHorizontal: 'sm', paddingVertical: 'xs', fontSize: 'sm', radius: 'full' },
    lg: { paddingHorizontal: 'md', paddingVertical: 'sm', fontSize: 'md', radius: 'full' },
}

export const BADGE_COLOR_MAP: Record<BadgeColor, Record<BadgeVariant, {
    bg: string
    text: string
    border: string
}>> = {
    primary: {
        filled: { bg: '#6366F1', text: '#FFFFFF', border: 'transparent' },
        outlined: { bg: 'transparent', text: '#6366F1', border: '#6366F1' },
        ghost: { bg: '#6366F126', text: '#6366F1', border: 'transparent' },
    },
    success: {
        filled: { bg: '#22C55E', text: '#FFFFFF', border: 'transparent' },
        outlined: { bg: 'transparent', text: '#16A34A', border: '#22C55E' },
        ghost: { bg: '#22C55E26', text: '#16A34A', border: 'transparent' },
    },
    warning: {
        filled: { bg: '#F59E0B', text: '#FFFFFF', border: 'transparent' },
        outlined: { bg: 'transparent', text: '#D97706', border: '#F59E0B' },
        ghost: { bg: '#F59E0B26', text: '#D97706', border: 'transparent' },
    },
    error: {
        filled: { bg: '#EF4444', text: '#FFFFFF', border: 'transparent' },
        outlined: { bg: 'transparent', text: '#DC2626', border: '#EF4444' },
        ghost: { bg: '#EF444426', text: '#DC2626', border: 'transparent' },
    },
    info: {
        filled: { bg: '#3B82F6', text: '#FFFFFF', border: 'transparent' },
        outlined: { bg: 'transparent', text: '#2563EB', border: '#3B82F6' },
        ghost: { bg: '#3B82F626', text: '#2563EB', border: 'transparent' },
    },
    neutral: {
        filled: { bg: '#6B7280', text: '#FFFFFF', border: 'transparent' },
        outlined: { bg: 'transparent', text: '#6B7280', border: '#6B7280' },
        ghost: { bg: '#6B728026', text: '#6B7280', border: 'transparent' },
    },
}