import database from '@react-native-firebase/database';

export interface RiderLocation {
  latitude: number;
  longitude: number;
}

type Unsubscribe = () => void;

export const subscribeToRiderLocation = (
  riderId: string,
  onUpdate: (location: RiderLocation) => void,
): Unsubscribe => {
  const ref = database().ref(`riders/${riderId}/location`);

  const onValueChange = ref.on('value', (snapshot) => {
    const data = snapshot.val();
    if (data?.latitude != null && data?.longitude != null) {
      onUpdate({ latitude: data.latitude, longitude: data.longitude });
    }
  });

  return () => ref.off('value', onValueChange);
};
