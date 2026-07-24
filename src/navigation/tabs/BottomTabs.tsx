import React from 'react';
import { ComponentProps } from 'react';
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

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const iconConfig: Record<
  keyof BottomTabsParamList,
  { active: IoniconName; inactive: IoniconName }
> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Menu: { active: 'restaurant', inactive: 'restaurant-outline' },
  OrderHistory: { active: 'receipt', inactive: 'receipt-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

export const BottomTabs = () => {
  const { colors, spacing, fontSize, fontWeight, radius } = theme;

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
          height: 60,
          paddingBottom: spacing.sm,
          paddingTop: spacing.xs,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          shadowColor: colors.text,
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: -4 },
          shadowRadius: 10,
          elevation: 8,
          borderWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.medium,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          tabBarLabel: 'Past Orders',
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
