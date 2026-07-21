// src/features/notifications/utils/handleNotificationTap.ts
// import { navigate } from '@navigation/navigationRef';

import { useMenuStore } from '@store/useMenuStore';

interface NotificationData {
  type?: 'order' | 'promo';
  orderId?: string;
  screen?: string;
  category?: string;
  itemId?: string;
}

export function handleNotificationTap(data: NotificationData | undefined) {
  if (!data?.type) return;

  if (data.type === 'order' && data.orderId) {
    navigate('OrderConfirmation', { orderId: data.orderId });
    return;
  }

  if (data.type === 'promo') {
    if (data.itemId) {
      // Deep link straight to a specific dish
      navigate('MainTabs', {
        screen: 'Menu',
        params: { itemId: data.itemId },
      });
      return;
    }

    if (data.category) {
      navigate('MainTabs', {
        screen: 'Menu',
        params: { category: data.category },
      });
      return;
    }

    // Generic promo, no specific target
    navigate('MainTabs', { screen: 'Home' });
  }

  if (data.itemId) {
    const item = useMenuStore.getState().items.find((i) => i.id === data.itemId);
    if (item) {
      navigate('MenuDetail', { item });
    } else {
      navigate('MainTabs', { screen: 'Menu' });
    }
    return;
  }
}
