import firestore from '@react-native-firebase/firestore';

export const submitReview = async (
  orderId: string,
  uid: string,
  rating: number,
  text: string,
): Promise<void> => {
  await firestore().collection('reviews').doc(orderId).set({
    orderId,
    uid,
    rating,
    text: text.trim(),
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

export const subscribeToUserReviews = (
  uid: string,
  onChange: (orderIds: Set<string>) => void,
  onError: (error: Error) => void,
) => {
  return firestore()
    .collection('reviews')
    .where('uid', '==', uid)
    .onSnapshot((snapshot) => {
      const orderIds = new Set(snapshot.docs.map((doc) => doc.id)); // doc.id === orderId
      onChange(orderIds);
    }, onError);
};
