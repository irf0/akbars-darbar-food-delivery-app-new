import { MenuItem, PortionType } from '@types';
import { create } from 'zustand';

interface PortionStoreState {
  isVisible: boolean;
  item: MenuItem | null;
  portionType: PortionType;
  openModal: (item: MenuItem | null) => void;
  setPortionType: (portionType: PortionType) => void;
  closeModal: () => void;
}

export const usePortionSelectorStore = create<PortionStoreState>((set) => ({
  isVisible: false,
  item: null,
  portionType: null,
  openModal: (passedItem) => set({ isVisible: true, item: passedItem, portionType: null }),
  setPortionType: (passedType) => set({ portionType: passedType }),
  closeModal: () => set({ isVisible: false }),
}));
