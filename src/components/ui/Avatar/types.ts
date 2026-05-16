import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarVariant = 'circle' | 'rounded' | 'square'
export type AvatarPresence = 'online' | 'offline' | 'away' | 'busy'

export interface AvatarProps {
    source?: ImageSourcePropType   // photo — if absent, falls back to initials
    initials?: string                // e.g. "JE" — if absent too, shows placeholder icon
    size?: AvatarSize
    variant?: AvatarVariant
    presence?: AvatarPresence        // dot indicator bottom-right
    badge?: React.ReactNode       // arbitrary overlay (e.g. a Badge component)
    style?: StyleProp<ViewStyle>
}