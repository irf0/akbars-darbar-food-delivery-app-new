import { useCallback, useEffect } from 'react';
import { fetchUserOrders } from 'src/global/services/ordersService';
import { useOrdersStore } from '@features/orders/store/useOrdersStore';

export const usePastOrders = (uid: string | undefined) => {
  const setOrders = useOrdersStore((state) => state.setOrders);
  const setLoading = useOrdersStore((state) => state.setLoading);

  const loadOrders = useCallback(async () => {
    if (!uid) {
      setOrders([]);
      return;
    }

    setLoading(true);
    try {
      const orders = await fetchUserOrders(uid);
      setOrders(orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  }, [uid, setOrders, setLoading]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    refresh: loadOrders,
  };
};
