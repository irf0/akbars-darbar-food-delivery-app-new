import { OrderDoc } from '@types';
import firestore from '@react-native-firebase/firestore';

export const fetchUserOrders = async (uid: string): Promise<(OrderDoc & { id: string })[]> => {
  const snapshot = await firestore()
    .collection('orders')
    .where('uid', '==', uid)
    .where('orderStatus', 'in', ['completed', 'cancelled'])
    .orderBy('createdAt', 'desc')
    .get();

  console.log('Orders fetched:', snapshot.size);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as OrderDoc),
  }));
};
