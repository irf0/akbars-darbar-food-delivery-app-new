import firestore from '@react-native-firebase/firestore'
import { Order, OrderStatus } from '../../../types/order.types'

// Place a new order
export const placeOrder = async (order: Omit<Order, 'orderId'>): Promise<string> => {
    const ref = firestore().collection('orders').doc()
    await ref.set({
        ...order,
        orderId: ref.id,
        createdAt: firestore.FieldValue.serverTimestamp(),
    })
    return ref.id
}

// Fetch all orders for a user
export const fetchOrderHistory = async (phone: string): Promise<Order[]> => {
    const snapshot = await firestore()
        .collection('orders')
        .where('phone', '==', phone)
        .orderBy('createdAt', 'desc')
        .get()

    return snapshot.docs.map((doc) => doc.data() as Order)
}

// Fetch single order
export const fetchOrderById = async (orderId: string): Promise<Order | null> => {
    const doc = await firestore().collection('orders').doc(orderId).get()
    if (!doc.exists) return null
    return doc.data() as Order
}

// Listen to order status in realtime
export const listenOrderStatus = (
    orderId: string,
    onData: (order: Order) => void,
    onError?: (error: Error) => void
) => {
    return firestore()
        .collection('orders')
        .doc(orderId)
        .onSnapshot((doc) => {
            if (!doc.exists) return
            onData(doc.data() as Order)
        },
            (error) => onError?.(error)
        )
}

// Update order status — called from admin panel
export const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus
): Promise<void> => {
    await firestore()
        .collection('orders')
        .doc(orderId)
        .update({ orderStatus: status })
}