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
): Promise<string> => {
  const docRef = await firestore()
    .collection('users')
    .doc(userId)
    .collection('addresses')
    .add({
      ...data,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

  return docRef.id;
};

//READ from DB
export const subscribeToUserAddresses = (
  userId: string,
  onData: (addresses: DarbarUserAddress[]) => void,
  onError: (error: Error) => void,
) => {
  return firestore()
    .collection('users')
    .doc(userId)
    .collection('addresses')
    .onSnapshot(
      (querySnapshot) => {
        const addresses: DarbarUserAddress[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          addresses.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate()?.toISOString() ?? '',
          } as DarbarUserAddress);
        });

        onData(addresses);
      },
      (error) => {
        onError(error);
      },
    );
};
