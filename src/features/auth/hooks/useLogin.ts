// src/features/auth/hooks/useLogin.ts

import { useState } from 'react';
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOTP = async (phone: string) => {
    try {
      setLoading(true);
      const auth = getAuth();
      const confirmation = await signInWithPhoneNumber(auth, `+91${phone}`);
      return confirmation;
    } catch (err: any) {
      console.log('RAW ERROR:', err);
      const message = err?.message ?? err?.code ?? 'Failed to send OTP';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendOTP };
};
