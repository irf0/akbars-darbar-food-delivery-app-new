import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthStore } from '@features/auth/store/useAuthStore'
import { useAdminSettings } from '@hooks/useAdminSettings'
import { AppStack } from './stacks/AppStack'
import { AuthStack } from './stacks/AuthStack'
import { linkingConfig } from './linkingConfig'
import { ToastProvider } from '@components/ui/Toast'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AppSplashScreen } from '@components/ui/Splash'
import ShopClosedScreen from '@features/auth/screens/ShopClosedScreen'
import OrderTypeScreen from '@features/auth/screens/OrderTypeScreen'
import { useOrderTypeStore } from '@store/orderType/useOrderTypeStore'


export default function RootNavigator() {
    const { orderType } = useOrderTypeStore()
    const [showSplash, setShowSplash] = useState(true)
    const { hasHydrated, isAuthenticated, hasCompletedOnboarding } = useAuthStore()
    const { settings } = useAdminSettings()

    const showApp = isAuthenticated && hasCompletedOnboarding
    const isShopClosed = settings?.isShopClosed ?? false


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ToastProvider>
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

                {(showSplash || !hasHydrated) && (
                    <AppSplashScreen onFinish={() => setShowSplash(false)} />
                )}
            </ToastProvider>
        </GestureHandlerRootView>
    )
}