import { CartItem, MenuItem, PortionType } from "../../../types/index";


export interface CartStore {
    items: CartItem[]
    orderType: 'delivery' | 'takeaway' | null
    addItem: (item: MenuItem, portion: PortionType, orderType: 'delivery' | 'takeaway') => void
    removeItem: (itemId: string, portion: PortionType, orderType: 'delivery' | 'takeaway') => void
    incrementItem: (itemId: string, portion: PortionType, orderType: 'delivery' | 'takeaway') => void
    decrementItem: (itemId: string, portion: PortionType, orderType: 'delivery' | 'takeaway') => void
    clearCart: () => void
    totalItems: () => number
    totalPrice: () => number

}