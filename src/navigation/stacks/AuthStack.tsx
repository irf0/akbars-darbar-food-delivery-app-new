import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '@navigation/types'
import PhoneScreen from '@features/auth/screens/PhoneScreen'
import OTPScreen from '@features/auth/screens/OTPScreen'
import RegisterScreen from '@features/auth/screens/RegisterScreen'
import WelcomeScreen from '@features/auth/screens/WelcomeScreen'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Phone" component={PhoneScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
    )
}