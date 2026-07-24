import { create } from 'zustand';
import { OrderDoc } from '@types';

export type OrderWithId = OrderDoc & { id: string };

interface OrdersStoreState {
  orders: OrderWithId[];
  isLoading: boolean;

  setOrders: (orders: OrderWithId[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useOrdersStore = create<OrdersStoreState>((set) => ({
  orders: [],
  isLoading: false,

  setOrders: (orders) => set({ orders }),
  setLoading: (isLoading) => set({ isLoading }),
}));
