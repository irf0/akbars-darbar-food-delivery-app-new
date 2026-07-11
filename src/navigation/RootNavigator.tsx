import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
import { useAdminSettingsStore } from '@store/useAdminSettingsStore';

export default function RootNavigator() {
  const [showSplash, setShowSplash] = useState(true);
  const { authHasHydrated, isAuthenticated, hasCompletedOnboarding } = useAuthStore();
  const { orderType, address, orderTypeHasHydrated } = useOrderTypeStore();
  const { settings } = useAdminSettingsStore();
  const { migrateLegacyAddress } = useAddressMigration();

  const showApp = isAuthenticated && hasCompletedOnboarding;
  const isShopClosed = settings?.isShopClosed ?? false;

  // Gate: takeaway alone is valid, delivery needs an address alongside it
  const hasValidOrderType = orderType === 'takeaway' || (orderType === 'delivery' && !!address);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  //Existing user address migration to new schema
  useEffect(() => {
    migrateLegacyAddress();
  }, []);

  // TODO: replace with proper AppSplashScreen once shared components are rebuilt
  if (showSplash || !authHasHydrated || !orderTypeHasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const navigatorKey = isShopClosed
    ? 'shop-closed'
    : showApp
      ? hasValidOrderType
        ? 'app'
        : 'order-type'
      : 'auth';

  return (
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
      <PortionSelectorModal />
    </GestureHandlerRootView>
  );
}
