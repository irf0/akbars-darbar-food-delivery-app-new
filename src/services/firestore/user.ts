import firestore from '@react-native-firebase/firestore'
import { DarbarUser, UserAddress } from '../../../types/user.types'

// Create user on register
export const createUser = async (user: DarbarUser): Promise<void> => {
    await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
            ...user,
            createdAt: firestore.FieldValue.serverTimestamp(),
        })
}

// Fetch user profile
export const getUser = async (uid: string): Promise<DarbarUser | null> => {
    const doc = await firestore()
        .collection('users')
        .doc(uid)
        .get()

    if (!doc.exists) return null
    return doc.data() as DarbarUser
}

// Update user profile
export const updateUser = async (
    uid: string,
    data: Partial<DarbarUser>
): Promise<void> => {
    await firestore()
        .collection('users')
        .doc(uid)
        .update(data)
}

// Update delivery address only
export const updateAddress = async (
    uid: string,
    address: UserAddress
): Promise<void> => {
    await firestore()
        .collection('users')
        .doc(uid)
        .update({ address })
}

// Save FCM token — called on every login
export const saveFCMToken = async (
    uid: string,
    token: string
): Promise<void> => {
    await firestore()
        .collection('users')
        .doc(uid)
        .update({ fcmToken: token })
}