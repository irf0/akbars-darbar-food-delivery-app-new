import firestore from '@react-native-firebase/firestore'
import { AdminSettings } from '../../../types/admin.types'

// Listens to admin settings in realtime
export const listenAdminSettings = (
    onData: (settings: AdminSettings) => void,
    onError?: (error: Error) => void
) => {
    return firestore()
        .collection('adminSettings')
        .onSnapshot((snapshot) => {
            if (snapshot.empty) return

            // adminSettings has only one document
            const doc = snapshot.docs[0]
            onData(doc.data() as AdminSettings)
        },
            (error) => onError?.(error)
        )
}