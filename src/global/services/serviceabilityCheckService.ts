import functions from '@react-native-firebase/functions';

interface ServiceabilityResponse {
  serviceable: boolean;
  fee: number | null;
  distance_km: number;
}

export const checkServiceability = async (
  lat: number,
  lng: number,
): Promise<ServiceabilityResponse> => {
  const callable = functions().httpsCallable('serviceability');
  const result = await callable({ lat, lng });
  // console.log(result.data);
  return result.data as ServiceabilityResponse;
};
