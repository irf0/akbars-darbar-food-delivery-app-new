import api from "@services/api"
import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"

export const useOTP = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { setAuth } = useAuthStore()

    const verifyOTP = async (phone: string, otp: string) => {
        try {
            setLoading(true)
            const response = await api.post('/auth/verify-otp', { phone, otp })
            const { token, user } = response.data
            setAuth(token, user)
            return true

        } catch (err) {
            setError((err as Error).message)
            return false
        } finally {
            setLoading(false)
        }
    }
    return { loading, error, verifyOTP }
}