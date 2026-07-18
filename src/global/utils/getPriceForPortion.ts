import { CartItem } from '@types';
import { useAdminSettingsStore } from '@store/useAdminSettingsStore';

type OrderType = 'delivery' | 'takeaway';

export function getPriceForPortion(
  item: Pick<CartItem, 'portion' | 'base_half_price' | 'base_full_price'>,
  orderType: OrderType,
): number {
  const settings = useAdminSettingsStore.getState().settings;

  if (!settings) {
    throw new Error('Admin settings have not been loaded.');
  }

  const basePrice = item.portion === 'half' ? item.base_half_price : item.base_full_price;

  const markup =
    orderType === 'delivery'
      ? settings.deliveryMenuHikePercentage
      : settings.takeawayMenuHikePercentage;

  return Math.round(basePrice * (1 + markup / 100));
}
