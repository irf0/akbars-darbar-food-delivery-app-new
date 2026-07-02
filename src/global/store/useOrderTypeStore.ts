import { create } from 'zustand'


interface OrderTypeStore {
    orderType: 'delivery' | 'takeaway' | null
    setOrderType: (type: 'delivery' | 'takeaway') => void
    clearOrderType: () => void
}

export const useOrderTypeStore = create<OrderTypeStore>((set) => ({
    orderType: null,
    setOrderType: (type) => set({ orderType: type }),
    clearOrderType: () => set({ orderType: null }),
}))
