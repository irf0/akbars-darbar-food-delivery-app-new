import firestore from '@react-native-firebase/firestore';

interface AddressData {
  latitude: number;
  longitude: number;
  street: string;
  label: string | undefined;
  flatNum: string;
  landmark: string;
}

export interface DarbarUserAddress {
  id: string;
  latitude: number;
  longitude: number;
  street: string;
  label: string | undefined;
  flatNum: string;
  landmark: string;
  createdAt: string;
}

//WRITE to DB
export const saveUserAddressToDb = async (
  userId: string | undefined,
  data: AddressData,
): Promise<void> => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('addresses')
    .add({
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
};

//READ from DB
export const getUserAddresses = async (
  userId: string | undefined,
): Promise<DarbarUserAddress[]> => {
  const snapshot = await firestore().collection('users').doc(userId).collection('addresses').get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data?.createdAt?.toDate()?.toISOString() ?? '',
    };
  }) as DarbarUserAddress[];
};
