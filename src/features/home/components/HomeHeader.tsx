import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { theme } from 'src/theme';
import { DeliveryBadge } from './DeliveryBadge';
import HeaderCartIcon from '@components/HeaderCartIcon';

import { AdminConfig, DarbarUser } from '@types';

interface Props {
  user: DarbarUser | null;
  settings: AdminConfig | null;
}

export const HomeHeader = ({ user, settings }: Props) => {
  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';

    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.greeting}>{greeting()},</Text>

        <Text style={styles.name}>{user?.firstName ?? 'Guest'}</Text>
      </View>

      <View style={styles.right}>
        {settings && <DeliveryBadge enabled={settings.deliveryEnabled} />}

        <HeaderCartIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
    zIndex: 10,
  },

  left: {
    flex: 1,
    marginRight: 16,
  },

  greeting: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    letterSpacing: -0.5,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
