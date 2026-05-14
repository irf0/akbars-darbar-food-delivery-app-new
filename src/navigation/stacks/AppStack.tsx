import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from '@navigation/types'
import { BottomTabs } from '@navigation/tabs/BottomTabs'
import PlaygroundMenuScreen from '@dev/PlaygroundMenuScreen'
import ButtonPreviewScreen from '@dev/ButtonPreviewScreen'
import InputPreviewScreen from '@dev/InputPreviewScreen'
import DividerPreviewScreen from '@dev/DividerPreviewScreen'
import CardPreviewScreen from '@dev/CardPreviewScreen'


const Stack = createNativeStackNavigator<AppStackParamList>()

export const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={BottomTabs} />

            {__DEV__ && (
                <>
                    <Stack.Screen
                        name="PlaygroundMenu"
                        component={PlaygroundMenuScreen}
                        options={{ title: '🛠️ UI Lab Dashboard' }}
                    />
                    <Stack.Screen
                        name="ButtonPreview"
                        component={ButtonPreviewScreen}
                        options={{ title: 'Button Variations' }}
                    />
                    <Stack.Screen
                        name="InputPreview"
                        component={InputPreviewScreen}
                        options={{ title: 'Form Input Fields' }}
                    />
                    <Stack.Screen
                        name="DividerPreview"
                        component={DividerPreviewScreen}
                        options={{ title: 'Dividers' }}
                    />
                    <Stack.Screen
                        name="CardPreview"
                        component={CardPreviewScreen}
                        options={{ title: 'Dividers' }}
                    />
                </>
            )}
        </Stack.Navigator>
    )
}