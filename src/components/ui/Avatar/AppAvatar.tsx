import React, { useMemo, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AVATAR_FALLBACK_COLORS, DEFAULTS } from './constants'
import { createAvatarStyles } from './styles'
import type { AvatarProps } from './types'

// Simple hash from a string → picks a consistent fallback color
const hashColor = (str: string): string => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }
    return AVATAR_FALLBACK_COLORS[Math.abs(hash) % AVATAR_FALLBACK_COLORS.length]
}

export const AppAvatar: React.FC<AvatarProps> = ({
    source,
    initials,
    size = DEFAULTS.size,
    variant = DEFAULTS.variant,
    presence,
    badge,
    style,
}) => {
    const { colors } = useTheme()
    const [imageError, setImageError] = useState(false)

    const bgColor = useMemo(
        () => initials ? hashColor(initials) : AVATAR_FALLBACK_COLORS[0],
        [initials],
    )

    const styles = useMemo(
        () => createAvatarStyles(size, variant, presence, bgColor, colors.surface),
        [size, variant, presence, bgColor, colors.surface],
    )

    const showImage = source && !imageError

    return (
        <View style={[styles.container, style]}>
            {/* ── Image ── */}
            {showImage && (
                <Image
                    source={source}
                    style={styles.image}
                    resizeMode="cover"
                    onError={() => setImageError(true)}
                />
            )}

            {/* ── Initials / placeholder fallback ── */}
            {!showImage && (
                <View style={styles.fallback}>
                    {initials ? (
                        <Text style={styles.initials}>
                            {initials.slice(0, 2).toUpperCase()}
                        </Text>
                    ) : (
                        <Text style={[styles.initials, { fontSize: styles.initials.fontSize * 1.1 }]}>
                            👤
                        </Text>
                    )}
                </View>
            )}

            {/* ── Presence dot ── */}
            {presence && <View style={styles.presenceDot} />}

            {/* ── Badge slot ── */}
            {badge && <View style={styles.badgeWrapper}>{badge}</View>}
        </View>
    )
}

