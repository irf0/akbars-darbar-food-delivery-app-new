import { MenuItem } from '@types';
import { getPriceForPortion } from './getPriceForPortion';

type OrderType = 'delivery' | 'takeaway';

export function getDisplayPrice(item: MenuItem, orderType: OrderType | null): number {
  if (!orderType) return 0;

  const prices = [
    {
      ...item,
      portion: 'half' as const,
    },
    {
      ...item,
      portion: 'full' as const,
    },
  ]
    .map((i) => getPriceForPortion(i, orderType))
    .filter((price) => price > 0);

  return prices.length ? Math.min(...prices) : 0;
}
