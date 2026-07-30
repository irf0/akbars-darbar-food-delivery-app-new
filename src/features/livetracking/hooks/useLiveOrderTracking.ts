import { useEffect, useRef, useState } from 'react';
import { LatLng } from 'react-native-maps';
import { getPolylineRoute } from 'src/global/services/polylineFetchService';
import { getBearing } from '../utils/getBearing';
import { useRiderLocationListener } from './useRiderLocationListener';
import { distanceBetween, getRouteAheadOfRider } from '../utils/getRemainingRoute';

// Flip this to false once real orders have an assigned rider with live RTDB updates.
const USE_MOCK_RIDER = false;

const MOCK_RIDER_LOCATION: LatLng = {
  latitude: 27.481739462442544,
  longitude: 95.34051594550422,
};

const MIN_DISTANCE_FOR_BEARING = 8; // meters — avoids heading jitter when stationary

interface UseLiveOrderTrackingParams {
  assignedRiderId: string | null | undefined;
  customerLocation: LatLng | null;
}

export function useLiveOrderTracking({
  assignedRiderId,
  customerLocation,
}: UseLiveOrderTrackingParams) {
  const liveRiderLocation = useRiderLocationListener(assignedRiderId);
  const riderLocation = USE_MOCK_RIDER ? MOCK_RIDER_LOCATION : liveRiderLocation;

  const [fullRoute, setFullRoute] = useState<LatLng[]>([]);
  const [remainingRoute, setRemainingRoute] = useState<LatLng[]>([]);
  const [riderHeading, setRiderHeading] = useState(0);

  const hasFetchedRoute = useRef(false);
  const previousLocation = useRef<LatLng | null>(null);
  const riderProgressIndex = useRef(0);

  // Fetch the full route once,
  useEffect(() => {
    if (!riderLocation || !customerLocation || hasFetchedRoute.current) return;

    hasFetchedRoute.current = true;
    getPolylineRoute(riderLocation, customerLocation)
      .then((route) => {
        setFullRoute(route);
        setRemainingRoute(route);
        riderProgressIndex.current = 0;
      })
      .catch((err) => console.error('Failed to fetch route:', err));
  }, [riderLocation, customerLocation]);

  // Reduce the visible route as the rider moves.
  useEffect(() => {
    if (!riderLocation || fullRoute.length === 0) return;

    const { remainingRoute: updatedRoute, newIndex } = getRouteAheadOfRider(
      fullRoute,
      riderLocation,
      riderProgressIndex.current,
    );

    riderProgressIndex.current = newIndex;
    setRemainingRoute(updatedRoute);
  }, [riderLocation, fullRoute]);

  // Recalculate heading only on meaningful movement.
  useEffect(() => {
    if (!riderLocation) return;

    if (previousLocation.current) {
      const moved = distanceBetween(previousLocation.current, riderLocation);
      if (moved >= MIN_DISTANCE_FOR_BEARING) {
        setRiderHeading(getBearing(previousLocation.current, riderLocation));
        previousLocation.current = riderLocation;
      }
    } else {
      previousLocation.current = riderLocation;
    }
  }, [riderLocation]);

  return {
    riderLocation,
    remainingRoute,
    riderHeading,
    isReady: !!riderLocation && !!customerLocation,
  };
}
