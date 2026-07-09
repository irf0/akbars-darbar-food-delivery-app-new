import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { DarbarUser } from '@types';

type AddressForm = {
  area: string;
  building: string;
  street: string;
  city: string;
  label?: string;
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuthStore();

  const registerUser = async (firstName: string, lastName: string, addresses: AddressForm) => {
    try {
      setLoading(true);
      setError(null);

      const currentUser = auth().currentUser;
      if (!currentUser) return false;
      const token = await currentUser.getIdToken();
      const newUser: DarbarUser = {
        uid: currentUser.uid,
        phone: currentUser.phoneNumber ?? '',
        firstName,
        lastName,
        isRegistered: true,
        fcmToken: '',
        addresses: [
          {
            id: Date.now().toString(),
            label: addresses.label || 'Home',
            area: addresses.area,
            building: addresses.building,
            street: addresses.street,
            city: addresses.city,
            isDefault: true,
          },
        ],
        createdAt: new Date().toISOString(),
      };
      await firestore().collection('users').doc(currentUser.uid).set(newUser);
      setAuth(token, newUser);
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, registerUser };
};
