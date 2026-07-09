import OTPScreen from '@features/auth/screens/OTPScreen';
import PhoneScreen from '@features/auth/screens/PhoneScreen';
import RegisterScreen from '@features/auth/screens/RegisterScreen';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { AuthStackParamList } from '@navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export const AuthStack = () => {
  const { isAuthenticated } = useAuthStore();

  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? 'Register' : 'Phone'}>
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
