import { OrderDoc } from '@types';
import {
  DELIVERY_ORDER_STATUS,
  DELIVERY_ORDER_STEPS,
  TAKEAWAY_ORDER_STATUS,
  TAKEAWAY_ORDER_STEPS,
} from '../constants/orderStatus';

export function getOrderStatusConfig(order: OrderDoc) {
  const isPickup = order.orderType === 'takeaway';

  return {
    config: (isPickup ? TAKEAWAY_ORDER_STATUS : DELIVERY_ORDER_STATUS)[order.orderStatus],
    steps: isPickup ? TAKEAWAY_ORDER_STEPS : DELIVERY_ORDER_STEPS,
  };
}
