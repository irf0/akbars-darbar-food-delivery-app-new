import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

interface OrderETA {
  remainingMin: number | null;
  etaText: string;
}

export function useOrderETATimer(estimatedDeliveryAt?: number): OrderETA {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!estimatedDeliveryAt) return;

    const interval = setInterval(() => setNow(Date.now()), 60000);

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') setNow(Date.now());
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [estimatedDeliveryAt]);

  if (!estimatedDeliveryAt) {
    return { remainingMin: null, etaText: '' };
  }

  const remainingMs = estimatedDeliveryAt - now;
  const remainingMin = Math.ceil(remainingMs / 60000);

  const etaText = remainingMin > 0 ? `Arriving in ${remainingMin} min` : 'Arriving any moment';

  return { remainingMin, etaText };
}
