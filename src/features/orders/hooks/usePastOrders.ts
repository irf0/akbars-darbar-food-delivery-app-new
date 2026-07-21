import { useEffect } from 'react';
import { useOrdersStore } from '@features/orders/store/useOrdersStore';
import { fetchUserOrders } from 'src/global/services/ordersService';

export const usePastOrders = (uid: string | undefined) => {
  const setLoading = useOrdersStore((state) => state.setLoading);
  const setOrders = useOrdersStore((state) => state.setOrders);

  useEffect(() => {
    if (!uid) return;

    setLoading(true);

    fetchUserOrders(uid)
      .then((orders) => {
        setOrders(orders);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      });
  }, [uid]);
};
