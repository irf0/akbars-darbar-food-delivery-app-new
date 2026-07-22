import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { useMenu } from '@hooks/useMenu';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useAdminSettings } from '@hooks/useAdminSettings';
import * as Notifications from 'expo-notifications';

export default function App() {
  useAdminSettings(); //listens to admin collection for any changes
  useMenu(); //listens to menu collection for any changes (app-lifetime-once)

  useEffect(() => {
    Notifications.setNotificationChannelAsync('order-updates', {
      name: 'Order Updates',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });

    Notifications.setNotificationChannelAsync('promotions', {
      name: 'Promotions & Offers',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <RootNavigator />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
