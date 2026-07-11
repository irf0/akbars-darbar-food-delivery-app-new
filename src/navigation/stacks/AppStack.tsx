import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { BottomTabs } from '@navigation/tabs/BottomTabs';
import SearchScreen from '@features/search/screens/SearchScreen';
import MenuDetailScreen from '@features/menu/screens/MenuDetailScreen';
import CartScreen from '@features/cart/screens/CartScreen';
import AddressPickerScreen from '@features/geolocation/screens/AddressPickerScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      <Stack.Screen name="AddressPicker" component={AddressPickerScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="MenuDetail" component={MenuDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};
//Addressicker is regd in here AND in ordetypestack due to two way entry
//First entry : for new user
//Second entry : mid-session switch of ordertype from INSIDE the app
