import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

export interface OrderConfirmationData {
  orderNumber: string;
  deliveryOtp: string;
  orderType: 'delivery' | 'takeaway';
  orderStatus: string;
  paymentStatus: string;
  bill: {
    itemsSubtotal: number;
    deliveryCharge: number;
    packingCharge: number;
    platformFee: number;
    discount: number;
    total: number;
    cgstAmount: number;
    sgstAmount: number;
    appliedCoupon: { code: string; type: 'flat' | 'percentage'; value: number } | null;
  };
  lineItems: { name: string; portion: string; quantity: number; lineTotal: number }[];
  takeawaySlot: string | null;
}

export const useOrderConfirmation = (orderId: string) => {
  const [order, setOrder] = useState<OrderConfirmationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('orders')
      .doc(orderId)
      .onSnapshot(
        (doc) => {
          if (doc.exists()) {
            setOrder(doc.data() as OrderConfirmationData);
          } else {
            setError(true);
          }
          setLoading(false);
        },
        (err) => {
          console.error('Failed to fetch order:', err);
          setError(true);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, [orderId]);

  return { order, loading, error };
};
