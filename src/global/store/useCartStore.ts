import { createMMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, MenuItem, PortionType } from '../../types/index';
import { useOrderTypeStore } from './useOrderTypeStore';
import { getPriceForPortion } from '@utils/getPriceForPortion';

interface CartStoreState {
  items: CartItem[];
  addItem: (item: MenuItem, portion: PortionType, quantity: number) => void;
  removeItem: (itemId: string, portion: PortionType) => void;
  incrementItem: (itemId: string, portion: PortionType) => void;
  decrementItem: (itemId: string, portion: PortionType) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const storage = createMMKV({ id: 'darbar-cart' });

const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, portion, quantity) => {
        const existing = get().items.find((i) => i.id === item.id && i.portion === portion);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id && i.portion === portion
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity, portion }],
          }));
        }
      },

      removeItem: (itemId, portion) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === itemId && i.portion === portion)),
        }));
      },

      incrementItem: (itemId, portion) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId && i.portion === portion ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }));
      },

      decrementItem: (itemId, portion) => {
        const item = get().items.find((i) => i.id === itemId && i.portion === portion);
        if (!item) return;
        if (item.quantity === 1) {
          get().removeItem(itemId, portion);
        } else {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === itemId && i.portion === portion ? { ...i, quantity: i.quantity - 1 } : i,
            ),
          }));
        }
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => {
        const orderType = useOrderTypeStore.getState().orderType;

        return get().items.reduce((sum, item) => {
          return sum + getPriceForPortion(item, orderType) * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'darbar-cart',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
