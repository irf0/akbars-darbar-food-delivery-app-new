import { OrderDoc } from '@types';
import firestore from '@react-native-firebase/firestore';

const ACTIVE_ORDER_STATUSES: OrderDoc['orderStatus'][] = [
  'placed',
  'accepted',
  'confirmed',
  'preparing',
  'ready',
  'out_for_delivery',
];

export const subscribeToActiveOrder = (
  userId: string,
  onData: (order: (OrderDoc & { id: string }) | null) => void,
  onError: (error: Error) => void,
) => {
  return firestore()
    .collection('orders')
    .where('uid', '==', userId)
    .where('orderStatus', 'in', ACTIVE_ORDER_STATUSES)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .onSnapshot(
      (querySnapshot) => {
        if (querySnapshot.empty) {
          onData(null);
          return;
        }

        const doc = querySnapshot.docs[0];

        onData({
          id: doc.id,
          ...(doc.data() as OrderDoc),
        });
      },
      (error) => {
        onError(error);
      },
    );
};
