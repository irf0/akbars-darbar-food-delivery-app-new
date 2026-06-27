import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from '@navigation/types'
import { BottomTabs } from '@navigation/tabs/BottomTabs'
import SearchScreen from '@features/search/screens/SearchScreen'
import MenuDetailScreen from '@features/menu/screens/MenuDetailScreen'

// Entire dev module tree is excluded from production bundle

const Stack = createNativeStackNavigator<AppStackParamList>()


export const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={BottomTabs} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="MenuDetails" component={MenuDetailScreen} />
    </Stack.Navigator>
)