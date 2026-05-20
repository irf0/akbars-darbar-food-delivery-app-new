import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import { saveFCMToken } from '@services/firestore/user'
import { useAuthStore } from '@features/auth/store/useAuthStore'

export const useFCM = () => {
    const { user } = useAuthStore()

    useEffect(() => {
        if (!user?.uid) return

        // Save token on mount
        const registerToken = async () => {
            const token = await messaging().getToken()
            await saveFCMToken(user.uid, token)
        }

        registerToken()

        // Save new token if refreshed
        const unsubscribeRefresh = messaging().onTokenRefresh(async (token) => {
            await saveFCMToken(user.uid, token)
        })

        // Handle foreground messages
        const unsubscribeMessage = messaging().onMessage(async (remoteMessage) => {
            console.log('FCM message received:', remoteMessage)
            // Toast or in-app notification handled here later
        })

        return () => {
            unsubscribeRefresh()
            unsubscribeMessage()
        }
    }, [user?.uid])
}