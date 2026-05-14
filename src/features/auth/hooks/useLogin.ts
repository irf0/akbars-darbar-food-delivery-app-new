import api from "@services/api"
import { useState } from "react"

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendOTP = async (phone: string) => {
        try {
            setLoading(true)
            const response = await api.post('/auth/send-otp', { phone })
            response.data
            return true
        } catch (err) {
            setError((err as Error).message)
            return false
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, sendOTP }
}