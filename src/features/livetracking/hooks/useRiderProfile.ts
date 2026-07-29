import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

interface RiderProfile {
  name: string;
  phone: string;
  photoUrl?: string;
  vehicleNumber?: string;
}

export function useRiderProfile(riderId: string | null | undefined) {
  const [riderProfile, setRiderProfile] = useState<RiderProfile | null>(null);

  useEffect(() => {
    if (!riderId) return;

    const unsubscribe = firestore()
      .collection('riders')
      .doc(riderId)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
          setRiderProfile({
            name: data.name,
            phone: data.phone,
          });
        }
      });

    return () => unsubscribe();
  }, [riderId]);

  return riderProfile;
}
