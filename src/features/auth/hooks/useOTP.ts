import { useState } from 'react'
import {
    getAuth,
    getIdToken,
    PhoneAuthProvider,
    signInWithCredential,
    FirebaseAuthTypes
} from '@react-native-firebase/auth'
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore'
import { useAuthStore } from '../store/useAuthStore'
import { DarbarUser } from '../../../../types/index'

export const useOTP = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { setAuth, completeOnboarding } = useAuthStore()

    const verifyOTP = async (confirmation: FirebaseAuthTypes.ConfirmationResult, otp: string) => {
        try {
            setLoading(true)

            const credential = PhoneAuthProvider.credential(
                (confirmation as any)._verificationId,
                otp
            )

            const auth = getAuth()
            const result = await signInWithCredential(auth, credential)

            if (!result) {
                setError('Invalid OTP. Please try again.')
                return null
            }

            const token = await getIdToken(result.user)
            const db = getFirestore()
            const userDoc = await getDoc(doc(db, 'users', result.user.uid))

            if (!userDoc.exists()) {
                return 'register'
            }

            const user = userDoc.data() as DarbarUser
            setAuth(token, user)

            if (user.isRegistered) {
                completeOnboarding()
            }

            return user.isRegistered ? 'home' : 'register'

        } catch (err: any) {
            setError(err.message ?? 'Invalid OTP. Please try again.')
            return null
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, verifyOTP }
}