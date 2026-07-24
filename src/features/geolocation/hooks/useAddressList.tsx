import { useEffect, useState } from 'react';
import { DarbarUserAddress, subscribeToUserAddresses } from 'src/global/services/addressService';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export const useAddressList = () => {
  const uid = useAuthStore((state) => state.user?.uid);

  const [addresses, setAddresses] = useState<DarbarUserAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;

    setLoading(true);

    const unsubscribe = subscribeToUserAddresses(
      uid,
      (data) => {
        setAddresses(data);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [uid]);

  // derive the no-user case instead of writing it into state
  return {
    addresses: uid ? addresses : [],
    loading: uid ? loading : false,
    error,
  };
};
