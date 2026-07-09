import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { BottomTabs } from '@navigation/tabs/BottomTabs';
import SearchScreen from '@features/search/screens/SearchScreen';
import MenuDetailScreen from '@features/menu/screens/MenuDetailScreen';
import CartScreen from '@features/cart/screens/CartScreen';
import AddressPickerScreen from '@features/geolocation/screens/AddressPickerScreen';
import OrderTypeScreen from '@features/ordertype/screens/OrderTypeScreen';

// Entire dev module tree is excluded from production bundle

const Stack = createNativeStackNavigator<AppStackParamList>();

type AppStackProps = {
  initialRouteName: keyof AppStackParamList;
};

export const AppStack = ({ initialRouteName }: AppStackProps) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="OrderType"
      component={OrderTypeScreen}
      options={{ headerShown: false, gestureEnabled: false }}
    />
    <Stack.Screen name="AddressPicker" component={AddressPickerScreen} />
    <Stack.Screen name="MainTabs" component={BottomTabs} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);
