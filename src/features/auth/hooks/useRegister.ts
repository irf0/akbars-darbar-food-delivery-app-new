import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { DarbarUser } from '@types';
import { registerForPushNotificationsAsync } from '@utils/registerForPushNotifications';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuthStore();

  const registerUser = async (firstName: string) => {
    try {
      setLoading(true);
      setError(null);

      const currentUser = auth().currentUser;
      if (!currentUser) return false;
      const token = await currentUser.getIdToken();
      const result = await registerForPushNotificationsAsync();
      const fcmToken = result.token;
      const notificationEnabled = result.enabled;

      const newUser: DarbarUser = {
        uid: currentUser.uid,
        phone: currentUser.phoneNumber ?? '',
        firstName,
        isRegistered: true,
        fcmToken: fcmToken,
        isNotificationEnabled: notificationEnabled,
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
