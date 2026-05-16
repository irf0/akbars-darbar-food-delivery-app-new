// src/navigation/RootNavigator.tsx

import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet, Appearance } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthStore } from '@features/auth/store/useAuthStore'
import { AppStack } from './stacks/AppStack'
import { AuthStack } from './stacks/AuthStack'
import { linkingConfig } from './linkingConfig'
import { useThemeStore } from '@store/themeStore'
import { ToastProvider } from '@components/ui/Toast'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


export default function RootNavigator() {

    //in case a device theme change on-the-go
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            const { mode } = useThemeStore.getState()
            if (mode === 'system') {
                useThemeStore.setState({ resolved: colorScheme ?? 'light' })
            }
        })
        return () => subscription.remove()
    }, [])

    const { hasHydrated, isAuthenticated, hasCompletedOnboarding } = useAuthStore()

    if (!hasHydrated) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    const showApp = isAuthenticated && hasCompletedOnboarding

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ToastProvider>
                <NavigationContainer linking={linkingConfig}>
                    {/* {showApp ? <AppStack /> : <AuthStack />} */}
                    {<AppStack />}
                </NavigationContainer>
            </ToastProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})