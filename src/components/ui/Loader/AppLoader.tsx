import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, Text, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import {
    DEFAULTS,
    DOT_COUNT,
    DOT_DURATION,
    LOADER_COLOR_MAP,
    PULSE_DURATION,
    SPINNER_DURATION,
} from './constants'
import { createLoaderStyles } from './styles'
import type { LoaderProps } from './types'

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = ({ styles }: { styles: ReturnType<typeof createLoaderStyles> }) => {
    const rotation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: SPINNER_DURATION,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start()
    }, [])

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return <Animated.View style={[styles.spinnerRing, { transform: [{ rotate }] }]} />
}

// ─── Dots ─────────────────────────────────────────────────────────────────────

const Dots = ({ styles }: { styles: ReturnType<typeof createLoaderStyles> }) => {
    const anims = useRef(
        Array.from({ length: DOT_COUNT }, () => new Animated.Value(0))
    ).current

    useEffect(() => {
        const animations = anims.map((anim, i) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(i * DOT_DURATION * 0.33),
                    Animated.timing(anim, { toValue: 1, duration: DOT_DURATION, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
                    Animated.timing(anim, { toValue: 0, duration: DOT_DURATION, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
                ]),
            )
        )
        Animated.parallel(animations).start()
    }, [])

    return (
        <View style={styles.dotsRow}>
            {anims.map((anim, i) => {
                const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] })
                const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] })
                return (
                    <Animated.View
                        key={i}
                        style={[styles.dot, { transform: [{ scale }], opacity }]}
                    />
                )
            })}
        </View>
    )
}

// ─── Pulse ────────────────────────────────────────────────────────────────────

const Pulse = ({ styles }: { styles: ReturnType<typeof createLoaderStyles> }) => {
    const scale = useRef(new Animated.Value(1)).current
    const opacity = useRef(new Animated.Value(0.8)).current

    useEffect(() => {
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(scale, { toValue: 1.4, duration: PULSE_DURATION, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
                    Animated.timing(scale, { toValue: 1, duration: PULSE_DURATION, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
                ]),
                Animated.sequence([
                    Animated.timing(opacity, { toValue: 0.2, duration: PULSE_DURATION, useNativeDriver: true }),
                    Animated.timing(opacity, { toValue: 0.8, duration: PULSE_DURATION, useNativeDriver: true }),
                ]),
            ]),
        ).start()
    }, [])

    return <Animated.View style={[styles.pulseCircle, { transform: [{ scale }], opacity }]} />
}

// ─── AppLoader ────────────────────────────────────────────────────────────────

export const AppLoader: React.FC<LoaderProps> = ({
    variant = DEFAULTS.variant,
    size = DEFAULTS.size,
    color = DEFAULTS.color,
    label,
    style,
}) => {
    const { fontFamily } = useTheme()
    const resolvedColor = LOADER_COLOR_MAP[color]
    const styles = useMemo(() => createLoaderStyles(size, resolvedColor), [size, resolvedColor])

    const renderLoader = () => {
        switch (variant) {
            case 'dots': return <Dots styles={styles} />
            case 'pulse': return <Pulse styles={styles} />
            default: return <Spinner styles={styles} />
        }
    }

    return (
        <View style={[styles.container, style]}>
            {renderLoader()}
            {label && (
                <Text style={[styles.label, { fontFamily: fontFamily.medium }]}>
                    {label}
                </Text>
            )}
        </View>
    )
}

export default AppLoader