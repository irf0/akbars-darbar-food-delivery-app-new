import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { useMenuSearchListener } from '@features/search/hooks/useMenuSearchListener';

export default function App() {
    useMenuSearchListener() //listens to menu collection for any changes (app-lifetime-once)
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <RootNavigator />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}
