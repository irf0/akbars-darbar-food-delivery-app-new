import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { OfflineBanner } from '@utils/network';

export default function App() {

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <OfflineBanner />
                <RootNavigator />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
