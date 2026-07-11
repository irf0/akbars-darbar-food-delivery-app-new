import firestore from '@react-native-firebase/firestore';

interface AddressData {
  latitude: number;
  longitude: number;
  street: string;
  label: string | undefined;
  flatNum: string;
  landmark: string;
}

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
