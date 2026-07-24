import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
  bottomOffset: number;
  show: (params: { message: string; type?: ToastType; bottomOffset?: number }) => void;
  hide: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  visible: false,
  message: '',
  type: 'success',
  bottomOffset: 0,
  show: ({ message, type = 'success', bottomOffset = 0 }) =>
    set({ visible: true, message, type, bottomOffset }),
  hide: () => set({ visible: false }),
}));
