import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCartStore } from '@store/useCartStore';
import { theme } from 'src/theme';

const t = theme;

export type CartBarProps = {
  onPress: () => void;
};

// This is the ONLY component subscribed to totalItems/totalPrice. Keeping
// that subscription out of MenuScreen means an add-to-cart tap re-renders
// just this bar, not the whole screen (and therefore not every row FlashList
// has mounted).
const CartBar = React.memo(({ onPress }: CartBarProps) => {
  const totalItems = useCartStore((state) => state.totalItems());
  const totalPrice = useCartStore((state) => state.totalPrice());

  if (totalItems === 0) return null;

  return (
    <View style={styles.cartBar} pointerEvents="auto">
      <TouchableOpacity style={styles.cartBarContent} activeOpacity={0.9} onPress={onPress}>
        <View>
          <Text style={styles.cartBarCount}>
            {totalItems} item{totalItems > 1 ? 's' : ''}
          </Text>
          <Text style={styles.cartBarPrice}>₹{totalPrice}</Text>
        </View>
        <View style={styles.cartBarAction}>
          <Text style={styles.cartBarActionText}>View Cart</Text>
          <Ionicons name="chevron-forward" size={16} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
});
CartBar.displayName = 'CartBar';

export default CartBar;

const styles = StyleSheet.create({
  cartBar: {
    position: 'absolute',
    left: t.spacing.lg,
    right: t.spacing.lg,
    bottom: t.spacing.lg,
    backgroundColor: t.colors.primary,
    borderRadius: t.radius.lg,
    shadowColor: t.colors.text,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  cartBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.md,
  },
  cartBarCount: {
    fontSize: t.fontSize.xs,
    color: 'rgba(255,255,255,0.85)',
  },
  cartBarPrice: {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.bold,
    color: '#fff',
  },
  cartBarAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cartBarActionText: {
    fontSize: t.fontSize.sm,
    fontWeight: t.fontWeight.bold,
    color: '#fff',
  },
});
