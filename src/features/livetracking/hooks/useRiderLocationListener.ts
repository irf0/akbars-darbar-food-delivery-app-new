import { useEffect, useState } from 'react';
import { subscribeToRiderLocation, RiderLocation } from 'src/global/services/riderLocationService';

export const useRiderLocationListener = (riderId: string | null | undefined) => {
  const [riderLocation, setRiderLocation] = useState<RiderLocation | null>(null);

  useEffect(() => {
    if (!riderId) return;

    const unsubscribe = subscribeToRiderLocation(riderId, setRiderLocation);
    return unsubscribe;
  }, [riderId]);

  return riderLocation;
};
