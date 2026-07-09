import * as Location from 'expo-location';
import { GPSLocation, PermissionResult } from './types';

export const requestLocation = async (): Promise<PermissionResult> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status === 'granted') return { status: 'granted', granted: true };
  if (status === 'undetermined') return { status: 'undetermined', granted: false };
  return { status: 'denied', granted: false };
};

export const checkLocationPermission = async (): Promise<PermissionResult> => {
  const { status } = await Location.getForegroundPermissionsAsync();

  if (status === 'granted') return { status: 'granted', granted: true };
  if (status === 'undetermined') return { status: 'undetermined', granted: false };
  return { status: 'denied', granted: false };
};

export const getCurrentCoords = async (): Promise<GPSLocation | null> => {
  const { granted } = await checkLocationPermission();
  if (!granted) return null;

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    accuracy: location.coords.accuracy,
  };
};

const isPlusCode = (value: string) => /^[A-Z0-9]{4,}\+[A-Z0-9]{2,3}$/.test(value);

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
): Promise<string | null> => {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (!results.length) return null;

    const place = results[0];
    const parts = [place.name, place.street, place.district, place.city].filter(
      (part): part is string => !!part && !isPlusCode(part),
    );

    return parts.length ? parts.join(', ') : null;
  } catch (error) {
    console.error('reverseGeocode failed:', error);
    return null;
  }
};
