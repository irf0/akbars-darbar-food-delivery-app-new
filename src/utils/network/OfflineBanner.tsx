import React, { useEffect, useRef } from 'react'
import { Animated, Text, StyleSheet } from 'react-native'
import { useNetworkStatus } from './useNetworkStatus'
import { useTheme } from '@hooks/useTheme'

export const OfflineBanner = () => {
    const { isConnected } = useNetworkStatus()
    const { colors, fontSize, fontFamily } = useTheme()
    const translateY = useRef(new Animated.Value(-60)).current

    useEffect(() => {
        if (isConnected === null) return

        Animated.timing(translateY, {
            toValue: isConnected ? 60 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }, [isConnected])

    return (
        <Animated.View style={[
            styles.banner,
            { backgroundColor: colors.error, transform: [{ translateY }] }
        ]}>
            <Text style={[
                styles.text,
                { fontSize: fontSize.sm, fontFamily: fontFamily.medium }
            ]}>
                No internet connection
            </Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    banner: {
        position: 'absolute',
        bottom: 0,        // ← was top: 0
        left: 0,
        right: 0,
        zIndex: 999,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
})