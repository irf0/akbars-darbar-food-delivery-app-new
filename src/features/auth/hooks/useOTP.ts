import { useState } from 'react'
import {
    getAuth,
    PhoneAuthProvider,
    signInWithCredential,
    getIdToken,
    FirebaseAuthTypes
} from '@react-native-firebase/auth'
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore'
import { useAuthStore } from '../store/useAuthStore'
import { DarbarUser } from '../../../types/index'
import { setConfirmation, clearConfirmation } from '../store/confirmationRef'
import { userDoc as getUserDocRef } from '@config/firebase';


export const useOTP = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { setAuth, completeOnboarding } = useAuthStore()

    const clearError = () => setError(null)

    const verifyOTP = async (confirmation: FirebaseAuthTypes.ConfirmationResult, otp: string) => {
        try {
            setLoading(true)
            clearError()
            const result = await confirmation.confirm(otp)

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
                clearConfirmation()
            }

            return user.isRegistered ? 'home' : 'register'

        } catch (err: any) {
            setError(err.message ?? 'Invalid OTP. Please try again.')
            return null
        } finally {
            setLoading(false)
        }
    }

    const resendOTP = async (phoneNumber: string) => {
        try {
            setLoading(true)
            clearError()
            const auth = getAuth()
            const newConfirmation = await auth.signInWithPhoneNumber(phoneNumber)
            setConfirmation(newConfirmation)
            return true
        } catch (err: any) {
            setError(err.message ?? 'Failed to resend OTP')
            return false
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, verifyOTP, resendOTP, clearError }
}