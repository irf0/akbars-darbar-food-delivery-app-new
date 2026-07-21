import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParamList } from '@navigation/types';

// Screens
import HomeScreen from '@features/home/screens/HomeScreen';
import ProfileScreen from '@features/profile/screens/ProfileScreen';
import MenuScreen from '@features/menu/screens/MenuScreen';
import { theme } from 'src/theme';
import OrderHistoryScreen from '@features/orders/screens/OrderHistoryScreen';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

// 1. Move icons OUTSIDE to prevent re-creating the object on every render
const iconConfig: Record<keyof BottomTabsParamList, { active: any; inactive: any }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Menu: { active: 'search', inactive: 'search-outline' },
  OrderHistory: { active: 'receipt', inactive: 'receipt-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

export const BottomTabs = () => {
  // 2. Use your theme tokens
  const { colors, spacing, fontSize, fontWeight } = theme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = focused
            ? iconConfig[route.name].active
            : iconConfig[route.name].inactive;

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: spacing.sm,
          paddingTop: spacing.xs,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.medium,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
