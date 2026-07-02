import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { MenuItem, PortionType } from './menuTypes'


export type OrderType = 'delivery' | 'takeaway';

export type DeliveryMethod = 'Delivery' | 'Takeaway'

export type OrderStatus =
    | 'Pending'
    | 'Confirmed'
    | 'Preparing'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled'

export interface DeliveryAddress {
    area: string
    building: string
    city: string
    street: string
}

export interface Taxes {
    CGST: number
    SGST: number
}

export interface OrderItem extends MenuItem {
    quantity: number
    selectedPortion: PortionType
}

export interface CartItem extends MenuItem {
    quantity: number
    portion: PortionType
}

export interface Order {
    orderId: string
    items: OrderItem[]
    orderDeliveryMethod: DeliveryMethod
    orderStatus: OrderStatus
    deliveryAddress: DeliveryAddress
    deliveryCharge: string
    discountGiven: number
    estimatedDeliveryTime: number
    estimatedTime: string
    isCod: boolean
    cookingPreference: string
    cancellationReason: string
    Taxes: Taxes
    createdAt: FirebaseFirestoreTypes.Timestamp
}