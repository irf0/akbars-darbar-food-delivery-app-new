import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { lightColors } from 'src/theme/colors';

const STATUS_LABELS: Record<string, string> = {
  placed: 'Order placed',
  accepted: 'Order confirmed',
  preparing: 'Preparing your order',
  ready: 'Your order is ready for pickup',
  out_for_delivery: 'On the way to you',
  completed: 'Order Delivered',
  cancelled: 'Your order is cancelled.',
};

interface Props {
  orderStatus: string;
  etaText?: string;
}

export function OrderStatusHeader({ orderStatus, etaText }: Props) {
  const label = STATUS_LABELS[orderStatus] ?? 'Order in progress';

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable>
          <Ionicons name="arrow-back" size={20} />
        </Pressable>
        <View>
          <Text style={styles.statusText}>{label}</Text>

          {orderStatus !== 'cancelled' && (
            <Text style={styles.etaText}>
              {orderStatus === 'completed' ? 'Arrived' : `${etaText ? etaText : '~45 mins'}`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  etaText: {
    fontSize: 13,
    color: lightColors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
});
