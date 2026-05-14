// src/navigation/RootNavigator.tsx

import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthStore } from '@features/auth/store/useAuthStore'
import { AppStack } from './stacks/AppStack'
import { AuthStack } from './stacks/AuthStack'
import { linkingConfig } from './linkingConfig'


export default function RootNavigator() {
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
        <NavigationContainer linking={linkingConfig}>
            {/* {showApp ? <AppStack /> : <AuthStack />} */}
            {<AppStack />}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})