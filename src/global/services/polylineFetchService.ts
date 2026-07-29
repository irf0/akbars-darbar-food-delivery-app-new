import functions from '@react-native-firebase/functions';
import polyline from '@mapbox/polyline';

interface LatLng {
  latitude: number;
  longitude: number;
}

interface GetPolylineRouteResponse {
  points: string;
}

export const getPolylineRoute = async (origin: LatLng, destination: LatLng): Promise<LatLng[]> => {
  const callable = functions().httpsCallable('getPolylineRouteFromDirectionsApi');
  const result = await callable({ origin, destination });
  const data = result.data as GetPolylineRouteResponse;

  return polyline.decode(data.points).map(([latitude, longitude]) => ({
    latitude,
    longitude,
  }));
};
