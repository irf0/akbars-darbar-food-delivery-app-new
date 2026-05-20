import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    Animated,
    Easing,
} from 'react-native'
import { useAdminSettings } from '@hooks/useAdminSettings'
import { shopClosedStyles } from '../styles'
import AppCard from '@components/ui/Card'
import { AppBadge } from '@components/ui/Badge'
import { formatTime } from '@utils/others/formatTime'
import { getTimeUntilOpening } from '@utils/others/getTimeUntilOpening'


export default function ShopClosedScreen() {
    const [countdown, setCountdown] = useState('')

    const { settings } = useAdminSettings()

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(30)).current
    const pulseAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
        if (!settings) return
        const interval = setInterval(() => {
            setCountdown(getTimeUntilOpening(settings.openingTime))
        }, 1000)
        return () => clearInterval(interval)
    }, [settings])


    useEffect(() => {
        // Fade + slide in
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 700,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start()

        // Pulse the emoji gently
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.12,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start()
    }, [])

    return (
        <View style={shopClosedStyles.container}>

            {/* Decorative top arc */}
            <View style={shopClosedStyles.arc} />

            <Animated.View
                style={[
                    shopClosedStyles.content,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                {/* Emoji */}
                <Animated.Text
                    style={[shopClosedStyles.emoji, { transform: [{ scale: pulseAnim }] }]}
                >
                    🍛
                </Animated.Text>

                {/* Pill badge */}
                <AppBadge
                    label="Currently Closed"
                    variant="filled"
                    color="error"
                    size="sm"
                />

                {/* Heading */}
                <Text style={shopClosedStyles.title}>We'll Be Back{'\n'}Very Soon!</Text>


                {/* Hours card */}
                {settings && (
                    <AppCard variant="outlined" size="md">
                        <AppCard.Body style={{ alignItems: 'center' }}>
                            <Text style={shopClosedStyles.hoursTime}>{countdown}</Text>
                            {/* <Text style={shopClosedStyles.hoursTime}>{formatTime(settings.openingTime)}</Text> */}
                            <Text style={shopClosedStyles.hoursSubLabel}>
                                Opening at {settings.openingTime}:00 {settings.openingTime < 12 ? "AM" : "PM"}
                            </Text>
                        </AppCard.Body>
                    </AppCard>
                )}

                {/* Footer */}
                <Text style={shopClosedStyles.footer}>
                    Thank you for your patience 🙏
                </Text>
            </Animated.View>

            {/* Decorative bottom arc */}
            <View style={shopClosedStyles.arcBottom} />
        </View>
    )
}

