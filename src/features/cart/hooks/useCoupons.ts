import { useEffect, useState } from 'react';
import { Coupon, subscribeToCoupons } from 'src/global/services/couponService';

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToCoupons(
      (data) => {
        setCoupons(data);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return {
    coupons,
    loading,
    error,
  };
};
