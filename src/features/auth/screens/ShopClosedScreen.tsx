import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    Animated,
    Easing,
} from 'react-native'
import { useAdminSettings } from '@hooks/useAdminSettings'
import { shopClosedStyles } from '../styles'
import { formatTime } from '@utils/formatTime'
import { getTimeUntilOpening } from '@utils/getTimeUntilOpening'
import { useAdminSettingsStore } from '@store/useAdminSettingsStore'


export default function ShopClosedScreen() {
    const [countdown, setCountdown] = useState('')

    const { settings } = useAdminSettingsStore()

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
            <View style={shopClosedStyles.arc} />

            <Animated.View
                style={[
                    shopClosedStyles.content,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                <Animated.Text
                    style={[shopClosedStyles.emoji, { transform: [{ scale: pulseAnim }] }]}
                >
                    🍛
                </Animated.Text>

                {/* TODO: replace with proper shared Badge component later */}
                <View style={{ backgroundColor: '#C62828', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 }}>
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Currently Closed</Text>
                </View>

                <Text style={shopClosedStyles.title}>We'll Be Back{'\n'}Very Soon!</Text>

                {/* TODO: replace with proper shared Card component later */}
                {settings && (
                    <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 16, alignItems: 'center' }}>
                        <Text style={shopClosedStyles.hoursTime}>{countdown}</Text>
                        <Text style={shopClosedStyles.hoursSubLabel}>
                            Opening at {settings.openingTime}:00 {settings.openingTime < 12 ? "AM" : "PM"}
                        </Text>
                    </View>
                )}

                <Text style={shopClosedStyles.footer}>
                    Thank you for your patience 🙏
                </Text>
            </Animated.View>

            <View style={shopClosedStyles.arcBottom} />
        </View>
    )
}