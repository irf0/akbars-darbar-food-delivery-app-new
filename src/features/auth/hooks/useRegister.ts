// src/features/auth/hooks/useRegister.ts

import api from "@services/api"
import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"

export const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { setAuth } = useAuthStore()

    const registerUser = async (
        phone: string,
        firstName: string,
        lastName: string,
        email?: string
    ) => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.post('/auth/register', { phone, firstName, lastName, email })
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

    return { loading, error, registerUser }
}