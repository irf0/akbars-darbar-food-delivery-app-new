import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { BottomTabs } from '@navigation/tabs/BottomTabs';
import SearchScreen from '@features/search/screens/SearchScreen';
import MenuDetailScreen from '@features/menu/screens/MenuDetailScreen';
import CartScreen from '@features/cart/screens/CartScreen';
import AddressPickerScreen from '@features/geolocation/screens/AddressPickerScreen';
import AddressesListScreen from '@features/geolocation/screens/AdressListScreen';
import CheckoutScreen from '@features/checkout/screens/CheckoutScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="AddressPicker" component={AddressPickerScreen} />
      <Stack.Screen name="AddressList" component={AddressesListScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};
//Addressicker is regd in here AND in ordetypestack due to two way entry
//First entry : for new user
//Second entry : mid-session switch of ordertype from INSIDE the app
