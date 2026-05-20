import { useState, useEffect } from 'react'
import { listenAdminSettings } from '@services/firestore/admin'
import { AdminSettings } from '../../types/admin.types'

export const useAdminSettings = () => {
    const [settings, setSettings] = useState<AdminSettings | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = listenAdminSettings(
            (data) => {
                setSettings(data)
                setLoading(false)
            },
            (error) => {
                console.error('Admin settings error:', error)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [])

    return { settings, loading }
}