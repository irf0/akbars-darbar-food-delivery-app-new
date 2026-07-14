import { useEffect, useState } from 'react';
import { getUserAddresses, DarbarUserAddress } from 'src/global/services/addressService';
import { useAuthStore } from '@features/auth/store/useAuthStore';

export const useAddressList = () => {
  const uid = useAuthStore((state) => state.user?.uid);
  const [addresses, setAddresses] = useState<DarbarUserAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    if (!uid) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const data = await getUserAddresses(uid);
      setAddresses(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [uid]);

  return { addresses, loading, error, refetch: fetchAddresses };
};
