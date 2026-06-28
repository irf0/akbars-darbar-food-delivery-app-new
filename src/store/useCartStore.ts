import { createMMKV } from 'react-native-mmkv'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, MenuItem, PortionType } from '../../types/index'

// ── Types ─────────────────────────────────────────────────────────────────────

interface CartStore {
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


// ── MMKV Storage Adapter ──────────────────────────────────────────────────────

const storage = createMMKV({ id: 'darbar-cart' })

const mmkvStorage = {
    getItem: (name: string) => {
        const value = storage.getString(name)
        return value ?? null
    },
    setItem: (name: string, value: string) => {
        storage.set(name, value)
    },
    removeItem: (name: string) => {
        storage.remove(name)
    },
}


export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            orderType: null,
            addItem: (item, portion, orderType) => {
                const existing = get().items.find(
                    i => i.id === item.id && i.portion === portion && i.orderType === orderType
                )
                if (existing) {
                    set(state => ({
                        items: state.items.map(i =>
                            i.id === item.id && i.portion === portion && i.orderType === orderType
                                ? { ...i, quantity: i.quantity + 1 }
                                : i
                        ),
                    }))
                } else {
                    set(state => ({
                        items: [...state.items, { ...item, quantity: 1, portion, orderType }],
                    }))
                }
            },

            removeItem: (itemId, portion, orderType) => {
                set(state => ({
                    items: state.items.filter(i => !(i.id === itemId && i.portion === portion && i.orderType === orderType))
                }))
            },

            incrementItem: (itemId, portion, orderType) => {
                set(state => ({
                    items: state.items.map(i =>
                        i.id === itemId && i.portion === portion && i.orderType === orderType ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                }))
            },

            decrementItem: (itemId, portion, orderType) => {
                const item = get().items.find(
                    i => i.id === itemId && i.portion === portion && i.orderType === orderType
                )
                if (!item) return
                if (item.quantity === 1) {
                    get().removeItem(itemId, portion, orderType)
                } else {
                    set(state => ({
                        items: state.items.map(i =>
                            i.id === itemId && i.portion === portion && i.orderType === orderType ? { ...i, quantity: i.quantity - 1 } : i
                        ),
                    }))
                }
            },

            clearCart: () => set({ items: [] }),

            totalItems: () =>
                get().items.reduce((sum, i) => sum + i.quantity, 0),

            totalPrice: () =>
                get().items.reduce((sum, i) => {
                    const price =
                        i.portion === 'half'
                            ? i.orderType === 'delivery'
                                ? i.half_delivery_price
                                : i.half_takeaway_price
                            : i.orderType === 'delivery'
                                ? i.full_delivery_price
                                : i.full_takeaway_price
                    return sum + price * i.quantity
                }, 0),
        }),
        {
            name: 'darbar-cart',
            storage: createJSONStorage(() => mmkvStorage),
        }
    )
)