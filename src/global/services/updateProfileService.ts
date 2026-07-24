import firestore from '@react-native-firebase/firestore';

interface UpdateProfileName {
  name: string;
}

interface UpdateNotificationPrefs {
  promotions: boolean;
}

//WRITE to DB
export const updateUserNameInDb = async (
  userId: string | undefined,
  data: UpdateProfileName,
): Promise<void> => {
  await firestore()
    .collection('users')
    .doc(userId)
    .set(
      {
        ...data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
};

//WRITE to DB
export const updateNotificationPrefsInDb = async (
  userId: string | undefined,
  data: UpdateNotificationPrefs,
): Promise<void> => {
  await firestore().collection('users').doc(userId).set(
    {
      notificationPrefs: data,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
};
