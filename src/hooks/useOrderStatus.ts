import { useState, useEffect } from 'react'
import { listenOrderStatus } from '@services/firestore/order'
import { Order } from '../../types/index'

export const useOrderStatus = (orderId: string) => {
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!orderId) return

        const unsubscribe = listenOrderStatus(
            orderId,
            (data) => {
                setOrder(data)
                setLoading(false)
            },
            (error) => {
                console.error('Order status error:', error)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [orderId])

    return { order, loading }
}