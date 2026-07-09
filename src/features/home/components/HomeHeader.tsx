import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from 'src/theme';
import { DeliveryBadge } from './DeliveryBadge';
import { AdminConfig, DarbarUser } from '@types';

const t = theme;

interface Props {
  user: DarbarUser | null;
  settings: AdminConfig | null;
  totalItems: number;
  onCartPress: () => void;
}

export const HomeHeader = ({ user, settings, totalItems, onCartPress }: Props) => {
  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{greeting()}</Text>
        <Text style={styles.userName}>{user?.firstName ?? 'Guest'} 👋</Text>
      </View>
      <View style={styles.headerRight}>
        {settings && <DeliveryBadge enabled={settings.deliveryEnabled} />}
        <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
          <Ionicons name="bag-outline" size={22} color={t.colors.text} />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.md,
  },
  greeting: {
    fontSize: t.fontSize.sm,
    color: t.colors.textSecondary,
    fontWeight: t.fontWeight.medium,
  },
  userName: {
    fontSize: t.fontSize.xl,
    fontWeight: t.fontWeight.bold,
    color: t.colors.text,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: t.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: t.colors.border,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: t.colors.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
