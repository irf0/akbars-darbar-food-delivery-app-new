import { create } from 'zustand'
import { OrderTypeStore } from './types'


export const useOrderTypeStore = create<OrderTypeStore>((set) => ({
    orderType: null,
    setOrderType: (type) => set({ orderType: type }),
    clearOrderType: () => set({ orderType: null }),
}))