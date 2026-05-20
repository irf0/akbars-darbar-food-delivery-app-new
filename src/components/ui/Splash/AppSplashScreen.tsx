import React, { useEffect, useRef } from 'react'
import { Animated, View, Text } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { splashStyles } from './styles'
import {
    SPLASH_ANIMATION,
    APP_NAME,
    APP_TAGLINE,
    APP_LOGO_LETTER,
} from './constants'
import { AppSplashScreenProps } from './types'

export const AppSplashScreen = ({ onFinish }: AppSplashScreenProps) => {
    const { colors, fontSize, fontFamily } = useTheme()

    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(SPLASH_ANIMATION.initialScale)).current
    const exitAnim = useRef(new Animated.Value(1)).current

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: SPLASH_ANIMATION.fadeInDuration,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: SPLASH_ANIMATION.springTension,
                    friction: SPLASH_ANIMATION.springFriction,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(SPLASH_ANIMATION.holdDuration),
            Animated.timing(exitAnim, {
                toValue: 0,
                duration: SPLASH_ANIMATION.fadeOutDuration,
                useNativeDriver: true,
            }),
        ]).start(() => onFinish())
    }, [])

    return (
        <Animated.View style={[
            splashStyles.container,
            { backgroundColor: colors.primary, opacity: exitAnim }
        ]}>
            <Animated.View style={[
                splashStyles.content,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
            ]}>
                <View style={[splashStyles.logoBox, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[splashStyles.logoText, { color: colors.primary }]}>
                        {APP_LOGO_LETTER}
                    </Text>
                </View>

                <Text style={[
                    splashStyles.appName,
                    {
                        color: colors.textInverse,
                        fontSize: fontSize.xxl,
                        fontFamily: fontFamily.bold,
                    }
                ]}>
                    {APP_NAME}
                </Text>

                <Text style={[
                    splashStyles.tagline,
                    {
                        color: colors.primaryLight,
                        fontSize: fontSize.sm,
                        fontFamily: fontFamily.regular,
                    }
                ]}>
                    {APP_TAGLINE}
                </Text>
            </Animated.View>
        </Animated.View>
    )
}