import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from '@navigation/types'
import { BottomTabs } from '@navigation/tabs/BottomTabs'
import PlaygroundMenuScreen from '@dev/PlaygroundMenuScreen'
import ButtonPreviewScreen from '@dev/ButtonPreviewScreen'
import InputPreviewScreen from '@dev/InputPreviewScreen'
import DividerPreviewScreen from '@dev/DividerPreviewScreen'
import CardPreviewScreen from '@dev/CardPreviewScreen'
import BadgePreviewScreen from '@dev/BadgePreviewScreen'
import AvatarPreviewScreen from '@dev/AvatarPreviewScreen'
import LoaderPreviewScreen from '@dev/LoaderPreviewScreen'
import SkeletonPreviewScreen from '@dev/SkeletonPreviewScreen'
import EmptyStatePreviewScreen from '@dev/EmptyStatePreviewScreen'
import ToastPreviewScreen from '@dev/ToastPreviewScreen'
import ModalPreviewScreen from '@dev/ModalPreviewScreen'
import BottomSheetPreviewScreen from '@dev/BottomSheetPreviewScreen'
import HeaderPreviewScreen from '@dev/HeaderPreviewScreen'
import ListItemPreviewScreen from '@dev/ListItemPreviewScreen'
import SplashPreviewScreen from '@dev/SplashPreviewScreen'


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
                        options={{ title: 'Cards' }}
                    />
                    <Stack.Screen
                        name="BadgePreview"
                        component={BadgePreviewScreen}
                        options={{ title: 'Badge' }}
                    />
                    <Stack.Screen
                        name="AvatarPreview"
                        component={AvatarPreviewScreen}
                        options={{ title: 'Avatar' }}
                    />
                    <Stack.Screen
                        name="LoaderPreview"
                        component={LoaderPreviewScreen}
                        options={{ title: 'Avatar' }}
                    />
                    <Stack.Screen
                        name="SkeletonPreview"
                        component={SkeletonPreviewScreen}
                        options={{ title: 'Avatar' }}
                    />
                    <Stack.Screen
                        name="EmptyStatePreview"
                        component={EmptyStatePreviewScreen}
                        options={{ title: 'Empty' }}
                    />
                    <Stack.Screen
                        name="ToastPreview"
                        component={ToastPreviewScreen}
                        options={{ title: 'Toast' }}
                    />
                    <Stack.Screen
                        name="ModalPreview"
                        component={ModalPreviewScreen}
                        options={{ title: 'Modal' }}
                    />
                    <Stack.Screen
                        name="HeaderPreview"
                        component={HeaderPreviewScreen}
                        options={{ title: 'Header' }}
                    />
                    <Stack.Screen
                        name="ListItemPreview"
                        component={ListItemPreviewScreen}
                        options={{ title: 'ListItem' }}
                    />
                    <Stack.Screen
                        name="SplashPreview"
                        component={SplashPreviewScreen}
                        options={{ title: 'Splash Screen' }}
                    />
                    {/* <Stack.Screen  //Doesn't run in Expo Go due to reanimated
                        name="BottomSheetPreview"
                        component={BottomSheetPreviewScreen}
                        options={{ title: 'Empty' }}
                    /> */}
                </>
            )}
        </Stack.Navigator>
    )
}