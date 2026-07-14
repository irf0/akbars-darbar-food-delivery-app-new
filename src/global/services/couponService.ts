import firestore from '@react-native-firebase/firestore';

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'flat' | 'percentage';
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  active: boolean;
}

export const subscribeToCoupons = (
  onData: (coupons: Coupon[]) => void,
  onError: (error: Error) => void,
) => {
  return firestore()
    .collection('coupons')
    .where('active', '==', true)
    .onSnapshot(
      (querySnapshot) => {
        const coupons: Coupon[] = [];

        querySnapshot.forEach((doc) => {
          coupons.push({
            id: doc.id,
            ...doc.data(),
          } as Coupon);
        });

        onData(coupons);
      },
      (error) => {
        onError(error);
      },
    );
};
