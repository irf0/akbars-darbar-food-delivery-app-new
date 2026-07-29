import { useEffect, useRef, useState } from 'react';
import { LatLng } from 'react-native-maps';
import {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const ANIMATION_DURATION_MS = 1500;

export function useAnimatedMarkerPosition(targetLocation: LatLng | null): LatLng | null {
  const latitude = useSharedValue(targetLocation?.latitude ?? 0);
  const longitude = useSharedValue(targetLocation?.longitude ?? 0);
  const hasInitialized = useRef(false);

  const [displayCoordinate, setDisplayCoordinate] = useState<LatLng | null>(targetLocation);

  useEffect(() => {
    if (!targetLocation) return;

    if (!hasInitialized.current) {
      // first position — snap immediately, nothing to animate from yet
      latitude.value = targetLocation.latitude;
      longitude.value = targetLocation.longitude;
      setDisplayCoordinate(targetLocation);
      hasInitialized.current = true;
      return;
    }

    // subsequent positions — glide smoothly to the new point
    latitude.value = withTiming(targetLocation.latitude, {
      duration: ANIMATION_DURATION_MS,
      easing: Easing.linear,
    });
    longitude.value = withTiming(targetLocation.longitude, {
      duration: ANIMATION_DURATION_MS,
      easing: Easing.linear,
    });
  }, [targetLocation]);

  // Every time the shared values change (each animation frame), push the
  // current interpolated position into regular state so <Marker> re-renders.
  useAnimatedReaction(
    () => ({ lat: latitude.value, lng: longitude.value }),
    (current) => {
      runOnJS(setDisplayCoordinate)({ latitude: current.lat, longitude: current.lng });
    },
  );

  return displayCoordinate;
}
