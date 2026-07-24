import React, { memo, useMemo, ComponentProps } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { theme } from '@theme';
import { easing } from 'src/theme/motion';
import { haptics } from 'src/theme/haptics';
import { withOpacity } from '../utils/colors';
import { OrderDoc } from '@types';

type Props = {
  order: OrderDoc;
  onPress: () => void;
};

type IconName = ComponentProps<typeof Ionicons>['name'];

type StatusConfig = {
  title: string;
  subtitle: string;
  icon: IconName;
  color: string;
  step: number;
};

const DELIVERY_STATUS: Record<string, StatusConfig> = {
  placed: {
    title: 'Order placed',
    subtitle: 'We have received your order',
    icon: 'receipt-outline',
    color: theme.colors.info,
    step: 0,
  },
  confirmed: {
    title: 'Order confirmed',
    subtitle: 'Restaurant is getting started',
    icon: 'checkmark-circle-outline',
    color: theme.colors.info,
    step: 0,
  },
  preparing: {
    title: 'Preparing your food',
    subtitle: 'Freshly cooking your meal',
    icon: 'restaurant-outline',
    color: theme.colors.warning,
    step: 1,
  },
  out_for_delivery: {
    title: 'Out for delivery',
    subtitle: 'Your rider is on the way',
    icon: 'bicycle-outline',
    color: theme.colors.warning,
    step: 2,
  },
  completed: {
    title: 'Delivered',
    subtitle: 'Enjoy your meal',
    icon: 'checkmark-circle-outline',
    color: theme.colors.successText,
    step: 3,
  },
  cancelled: {
    title: 'Order cancelled',
    subtitle: 'This order was cancelled',
    icon: 'close-circle-outline',
    color: theme.colors.error,
    step: 3,
  },
};

const PICKUP_STATUS: Record<string, StatusConfig> = {
  placed: {
    title: 'Order placed',
    subtitle: 'We have received your order',
    icon: 'receipt-outline',
    color: theme.colors.info,
    step: 0,
  },
  confirmed: {
    title: 'Order confirmed',
    subtitle: 'Restaurant is getting started',
    icon: 'checkmark-circle-outline',
    color: theme.colors.info,
    step: 0,
  },
  preparing: {
    title: 'Preparing your food',
    subtitle: 'Freshly preparing your meal',
    icon: 'restaurant-outline',
    color: theme.colors.warning,
    step: 1,
  },
  ready: {
    title: 'Ready for pickup',
    subtitle: 'Packed & ready',
    icon: 'bag-check-outline',
    color: theme.colors.success,
    step: 2,
  },
  completed: {
    title: 'Picked up',
    subtitle: 'Enjoy your meal',
    icon: 'checkmark-circle-outline',
    color: theme.colors.successText,
    step: 3,
  },
  cancelled: {
    title: 'Order cancelled',
    subtitle: 'This order was cancelled',
    icon: 'close-circle-outline',
    color: theme.colors.error,
    step: 3,
  },
};

const DELIVERY_STEP_LABELS = ['Placed', 'Preparing', 'On the way', 'Delivered'];
const PICKUP_STEP_LABELS = ['Placed', 'Preparing', 'Ready', 'Picked up'];

export const LiveOrderBanner = memo(({ order, onPress }: Props) => {
  const isPickup = order.orderType === 'takeaway';

  const statusMap = isPickup ? PICKUP_STATUS : DELIVERY_STATUS;
  const stepLabels = isPickup ? PICKUP_STEP_LABELS : DELIVERY_STEP_LABELS;

  const config = statusMap[order.orderStatus as keyof typeof statusMap] ?? statusMap.placed;

  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const onButtonPressIn = () => {
    buttonScale.value = withSpring(0.94, easing.spring);
  };

  const onButtonPressOut = () => {
    buttonScale.value = withSpring(1, easing.spring);
  };

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
              <Text style={styles.title}>{config.title}</Text>
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
          {stepLabels.map((label, index) => {
            const active = index <= config.step;

            return (
              <React.Fragment key={label}>
                <View style={[styles.circle, active && { backgroundColor: config.color }]} />

                {index !== stepLabels.length - 1 && (
                  <View
                    style={[styles.line, index < config.step && { backgroundColor: config.color }]}
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

          <Pressable
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
            onPress={handlePress}>
            <Animated.View style={[styles.trackButton, buttonAnimatedStyle]}>
              <Text style={styles.trackText}>Track Order</Text>
              <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
            </Animated.View>
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
