import React, { memo, useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@theme';
import { haptics } from 'src/theme/haptics';
import { withOpacity } from '../utils/colors';
import { OrderDoc } from '@types';
import { getOrderStatusConfig } from '../utils/getOrderStatusConfig';

type Props = {
  order: OrderDoc;
  onPress: () => void;
};

export const LiveOrderBanner = memo(({ order, onPress }: Props) => {
  const { config, steps } = getOrderStatusConfig(order);

  const handlePress = () => {
    haptics.tap();
    onPress();
  };

  const itemCount = useMemo(() => {
    return order.lineItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [order.lineItems]);

  const orderTitle = useMemo(() => {
    if (!order.lineItems.length) return '';

    const first = order.lineItems[0].name;

    if (itemCount === 1) {
      return first;
    }

    return `${first} +${itemCount - 1} more`;
  }, [order.lineItems, itemCount]);

  return (
    <View style={styles.shadowWrapper}>
      <View style={[styles.card, { backgroundColor: withOpacity(config.color, 0.04) }]}>
        {/* TOP */}
        <View style={styles.header}>
          <View style={styles.left}>
            <View
              style={[styles.iconContainer, { backgroundColor: withOpacity(config.color, 0.12) }]}>
              <Ionicons name={config.icon} size={18} color={config.color} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{order.orderStatus}</Text>
              <Text style={styles.subtitle}>{config.subtitle}</Text>
            </View>
          </View>

          <View style={styles.eta}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>18–22 min</Text>
          </View>
        </View>

        {/* FOOD */}
        <Text numberOfLines={1} style={styles.food}>
          {orderTitle}
        </Text>

        {/* TIMELINE */}
        <View style={styles.timelineContainer}>
          {steps.map((label, index) => {
            const active = index <= config.step;

            return (
              <React.Fragment key={label}>
                <View style={[styles.circle, active && { backgroundColor: config.color }]} />

                {index !== steps.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      index < config.step && {
                        backgroundColor: config.color,
                      },
                    ]}
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
            <Text style={styles.itemCount}>
              {itemCount} item{itemCount > 1 ? 's' : ''}
            </Text>
          </View>

          {/* //TODO: Wire correctly with real order doc */}
          <Pressable onPress={handlePress}>
            <View style={styles.trackButton}>
              <Text style={styles.trackText}>{'Live Tracking'}</Text>
              <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

LiveOrderBanner.displayName = 'LiveOrderBanner';

export const styles = StyleSheet.create({
  shadowWrapper: {
    marginTop: 15,
    borderRadius: 22,
    backgroundColor: theme.colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  card: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 22,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  eta: {
    alignItems: 'flex-end',
  },
  etaLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: theme.colors.textSecondary,
  },
  etaValue: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text,
  },
  food: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 54,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginLeft: 54,
    marginRight: 8,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.border,
  },
  line: {
    flex: 1,
    height: 3,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
  },
  footer: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
  },
  itemCount: {
    marginTop: 3,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: withOpacity(theme.colors.primary, 0.06),
  },
  trackText: {
    marginRight: 6,
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
