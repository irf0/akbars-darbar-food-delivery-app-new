import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { useMenu } from '@hooks/useMenu';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useAdminSettings } from '@hooks/useAdminSettings';

export default function App() {
  useAdminSettings(); //listens to admin collection for any changes
  useMenu(); //listens to menu collection for any changes (app-lifetime-once)

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
