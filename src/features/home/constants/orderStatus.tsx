import { theme } from '@theme';
import { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type OrderStatusConfig = {
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  color: string;
  step: number;
};

export const DELIVERY_ORDER_STATUS: Record<string, OrderStatusConfig> = {
  placed: {
    title: 'Order placed',
    subtitle: 'We have received your order',
    icon: 'receipt-outline',
    color: theme.colors.info,
    step: 0,
  },

  accepted: {
    title: 'Order accepted',
    subtitle: 'Restaurant has accepted your order',
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

  ready: {
    title: 'Waiting for rider',
    subtitle: 'Packed & waiting for pickup',
    icon: 'bag-check-outline',
    color: theme.colors.success,
    step: 2,
  },

  out_for_delivery: {
    title: 'Out for delivery',
    subtitle: 'Your rider is on the way',
    icon: 'bicycle-outline',
    color: theme.colors.primary,
    step: 3,
  },

  completed: {
    title: 'Delivered',
    subtitle: 'Enjoy your meal',
    icon: 'checkmark-circle-outline',
    color: theme.colors.successText,
    step: 4,
  },

  cancelled: {
    title: 'Order cancelled',
    subtitle: 'This order was cancelled',
    icon: 'close-circle-outline',
    color: theme.colors.error,
    step: 4,
  },
};

export const TAKEAWAY_ORDER_STATUS: Record<string, OrderStatusConfig> = {
  placed: {
    title: 'Order placed',
    subtitle: 'We have received your order',
    icon: 'receipt-outline',
    color: theme.colors.info,
    step: 0,
  },

  accepted: {
    title: 'Order accepted',
    subtitle: 'Restaurant has accepted your order',
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

export const DELIVERY_ORDER_STEPS = ['Placed', 'Preparing', 'Ready', 'On the way', 'Delivered'];

export const TAKEAWAY_ORDER_STEPS = ['Placed', 'Preparing', 'Ready', 'Picked up'];
