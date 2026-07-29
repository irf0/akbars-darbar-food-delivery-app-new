import { useEffect, useState } from 'react';

import { OrderDoc } from '@types';
import { subscribeToActiveOrder } from '../services/activeOrderService';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export const useActiveOrderListener = () => {
  const { user } = useAuthStore();

  const [activeOrder, setActiveOrder] = useState<(OrderDoc & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveOrder(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToActiveOrder(
      user.uid,
      (order) => {
        setActiveOrder(order);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [user?.uid]);

  return {
    activeOrder,
    loading,
    error,
  };
};
