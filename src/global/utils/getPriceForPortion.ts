import { CartItem, OrderType } from '@types';

export function getPriceForPortion(item: CartItem, orderType: 'delivery' | 'takeaway'): number {
  return item.portion === 'half'
    ? orderType === 'delivery'
      ? item.half_delivery_price
      : item.half_takeaway_price
    : orderType === 'delivery'
      ? item.full_delivery_price
      : item.full_takeaway_price;
}
