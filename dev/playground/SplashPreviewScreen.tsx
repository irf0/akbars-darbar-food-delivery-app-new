import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AppSplashScreen } from '@components/ui/Splash/AppSplashScreen'

export default function SplashPreviewScreen() {
    const [visible, setVisible] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Splash Screen</Text>
            <Text style={styles.subtitle}>Tap the button to preview the splash animation</Text>

            <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                <Text style={styles.buttonText}>Play Splash</Text>
            </TouchableOpacity>

            {visible && (
                <AppSplashScreen onFinish={() => setVisible(false)} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0F',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        padding: 24,
    },
    title: {
        color: '#F0F0F5',
        fontSize: 24,
        fontWeight: '700',
    },
    subtitle: {
        color: '#8A8A99',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
    },
    button: {
        marginTop: 16,
        backgroundColor: '#6EE7B7',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    buttonText: {
        color: '#0D0D0F',
        fontWeight: '700',
        fontSize: 15,
    },
})