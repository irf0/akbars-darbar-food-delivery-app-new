import React, { useEffect, useRef } from 'react'
import { Animated, Easing, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import {
    SKELETON_ANIMATION_DURATION,
    SKELETON_ANIMATION_MAX_OPACITY,
    SKELETON_ANIMATION_MIN_OPACITY,
    SKELETON_DEFAULTS,
    SKELETON_LAST_LINE_WIDTH,
    SKELETON_LINE_GAP,
} from './constants'
import { createSkeletonStyles } from './styles'
import type { SkeletonProps } from './types'

// ─── Shared pulse hook ────────────────────────────────────────────────────────

const usePulse = () => {
    const opacity = useRef(new Animated.Value(SKELETON_ANIMATION_MAX_OPACITY)).current

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: SKELETON_ANIMATION_MIN_OPACITY,
                    duration: SKELETON_ANIMATION_DURATION,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: SKELETON_ANIMATION_MAX_OPACITY,
                    duration: SKELETON_ANIMATION_DURATION,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).start()
    }, [])

    return opacity
}

// ─── Single bone ─────────────────────────────────────────────────────────────

const Bone = ({
    width,
    height,
    radius,
    baseColor,
    style,
}: {
    width: number | string
    height: number
    radius: number
    baseColor: string
    style?: any
}) => {
    const opacity = usePulse()
    const styles = createSkeletonStyles(baseColor, radius, width, height)

    return (
        <Animated.View style={[styles.bone, { opacity }, style]} />
    )
}

// ─── AppSkeleton ──────────────────────────────────────────────────────────────

export const AppSkeleton: React.FC<SkeletonProps> = ({
    variant = 'rect',
    width,
    height,
    radius,
    lines = 3,
    style,
}) => {
    const { colors } = useTheme()
    const baseColor = colors.surfaceAlt

    const defaults = SKELETON_DEFAULTS[variant]

    const resolvedWidth = width ?? defaults.width
    const resolvedHeight = height ?? defaults.height
    const resolvedRadius = radius ?? defaults.radius

    // ── Circle ────────────────────────────────────────────────────────────────
    if (variant === 'circle') {
        const size = (width as number) ?? defaults.width
        return (
            <Bone
                width={size}
                height={size}
                radius={size / 2}
                baseColor={baseColor}
                style={style}
            />
        )
    }

    // ── Text — multiple lines ─────────────────────────────────────────────────
    if (variant === 'text') {
        return (
            <View style={[{ width: resolvedWidth, gap: SKELETON_LINE_GAP }, style]}>
                {Array.from({ length: lines }).map((_, i) => (
                    <Bone
                        key={i}
                        width={i === lines - 1 ? SKELETON_LAST_LINE_WIDTH : '100%'}
                        height={resolvedHeight}
                        radius={resolvedRadius}
                        baseColor={baseColor}
                    />
                ))}
            </View>
        )
    }

    // ── Rect (default) ────────────────────────────────────────────────────────
    return (
        <Bone
            width={resolvedWidth}
            height={resolvedHeight}
            radius={resolvedRadius}
            baseColor={baseColor}
            style={style}
        />
    )
}

export default AppSkeleton