import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { AppStack } from './stacks/AppStack';
import { AuthStack } from './stacks/AuthStack';
import { OrderTypeStack } from './stacks/OrderTypeStack';
import { linkingConfig } from './linkingConfig';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ShopClosedScreen from '@features/auth/screens/ShopClosedScreen';
import { PortionSelectorModal } from 'src/global/components/PortionSelectorModal';
import { useAddressMigration } from '@hooks/useAddressMigration';
import messaging from '@react-native-firebase/messaging';
import { ToastHost } from '@components/ui/ToastHost';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlyToCartOverlay } from '@components/FlyToCartOverlay';
import AppSplashScreen from '@components/AppSplashScreen';

// import { useAdminSettingsStore } from '@store/useAdminSettingsStore';

export default function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);
  const { authHasHydrated, isAuthenticated, hasCompletedOnboarding } = useAuthStore();
  const { orderType, address, orderTypeHasHydrated } = useOrderTypeStore();
  // const { settings } = useAdminSettingsStore();
  const { migrateLegacyAddress } = useAddressMigration();

  const showApp = isAuthenticated && hasCompletedOnboarding;

  const isShopClosed = false; //TODO: TEMPORARY NO CHECKS!

  // const isShopClosed = settings?.isShopClosed ?? false;

  const hasValidOrderType = orderType === 'takeaway' || (orderType === 'delivery' && !!address);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  //Existing user address migration to new schema
  useEffect(() => {
    migrateLegacyAddress();
  }, []);

  //SUBSCRIBE TO PROMO NOTIFS
  useEffect(() => {
    const subscribeToPromotions = async () => {
      await messaging().subscribeToTopic('promotions');
    };

    if (isAuthenticated) {
      subscribeToPromotions().catch((err) => console.log('Topic subscribe failed:', err));
    }
  }, [isAuthenticated]);

  // TODO: replace with proper AppSplashScreen once shared components are rebuilt
  if (showSplash || !authHasHydrated || !orderTypeHasHydrated) {
    return <AppSplashScreen />;
  }

  const navigatorKey = isShopClosed
    ? 'shop-closed'
    : showApp
      ? hasValidOrderType
        ? 'app'
        : 'order-type'
      : 'auth';

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer key={navigatorKey} linking={linkingConfig}>
          {isShopClosed ? (
            <ShopClosedScreen />
          ) : showApp ? (
            hasValidOrderType ? (
              <AppStack />
            ) : (
              <OrderTypeStack />
            )
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
        <ToastHost />
        <PortionSelectorModal />
        <FlyToCartOverlay />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
