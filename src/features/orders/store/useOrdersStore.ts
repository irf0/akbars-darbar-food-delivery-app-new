import { OrderDoc } from '@types';
import { create } from 'zustand';

type OrderWithId = OrderDoc & { id: string };

interface OrdersStoreState {
  orders: OrderWithId[];
  isLoading: boolean;
  setOrders: (orders: OrderWithId[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useOrdersStore = create<OrdersStoreState>((set) => ({
  orders: [],
  isLoading: true,
  setOrders: (orders) => set({ orders }),
  setLoading: (isLoading) => set({ isLoading }),
}));
