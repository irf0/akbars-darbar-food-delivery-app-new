import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthStore } from '@features/auth/store/useAuthStore'
import { useAdminSettings } from '@hooks/useAdminSettings'
import { AppStack } from './stacks/AppStack'
import { AuthStack } from './stacks/AuthStack'
import { linkingConfig } from './linkingConfig'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ShopClosedScreen from '@features/auth/screens/ShopClosedScreen'
import OrderTypeScreen from '@features/auth/screens/OrderTypeScreen'
import { useOrderTypeStore } from '@store/useOrderTypeStore'
import { PortionSelectorModal } from '@components/PortionSelectorModal'


export default function RootNavigator() {
    const { orderType } = useOrderTypeStore()
    const [showSplash, setShowSplash] = useState(true)
    const { hasHydrated, isAuthenticated, hasCompletedOnboarding } = useAuthStore()
    const { settings } = useAdminSettings()

    const showApp = isAuthenticated && hasCompletedOnboarding
    const isShopClosed = settings?.isShopClosed ?? false

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 1500)
        return () => clearTimeout(timer)
    }, [])

    // TODO: replace with proper AppSplashScreen once shared components are rebuilt
    if (showSplash || !hasHydrated) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer linking={linkingConfig}>
                {isShopClosed
                    ? <ShopClosedScreen />
                    : showApp
                        ? !orderType
                            ? <OrderTypeScreen />
                            : <AppStack />
                        : <AuthStack />
                }
            </NavigationContainer>
            <PortionSelectorModal />
        </GestureHandlerRootView>
    )
}