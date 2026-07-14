import AddressPickerScreen from '@features/geolocation/screens/AddressPickerScreen';
import AddressListScreen from '@features/geolocation/screens/AdressListScreen';
import OrderTypeScreen from '@features/ordertype/screens/OrderTypeScreen';
import { OrderTypeStackParamList } from '@navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const OrderTypeStack = () => {
  const Stack = createNativeStackNavigator<OrderTypeStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OrderType">
      <Stack.Screen name="OrderType" component={OrderTypeScreen} />
      <Stack.Screen name="AddressPicker" component={AddressPickerScreen} />
      <Stack.Screen name="AddressList" component={AddressListScreen} />
    </Stack.Navigator>
  );
};
