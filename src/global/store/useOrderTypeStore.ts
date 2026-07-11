import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '@store/mmkvStorage';
import { OrderType } from '@types';

type Address = {
  lat: number;
  lng: number;
  formattedAddress: string;
};

interface OrderTypeState {
  orderType: OrderType | null;
  address: Address | null;
  orderTypeHasHydrated: boolean;

  setPickup: () => void;
  setDelivery: (address: Address) => void;
  resetOrderType: () => void;
  setOrderTypeHasHydrated: (hydrated: boolean) => void;
}

export const useOrderTypeStore = create<OrderTypeState>()(
  persist(
    (set) => ({
      orderType: null,
      address: null,
      orderTypeHasHydrated: false,

      setPickup: () => set({ orderType: 'takeaway' }),
      setDelivery: (address) => set({ orderType: 'delivery', address }),
      resetOrderType: () => set({ orderType: null, address: null }),
      setOrderTypeHasHydrated: (hydrated) => set({ orderTypeHasHydrated: hydrated }),
    }),

    //MMKV Storage
    {
      name: 'order-type-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),

      //tells zustand to store only these two values (partially)
      partialize: ({ orderType, address }) => ({ orderType, address }),

      onRehydrateStorage: () => (state) => {
        state?.setOrderTypeHasHydrated(true);
      },
    },
  ),
);
