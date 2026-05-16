import { create } from 'zustand'
import type { ToastConfig, ToastState } from './types'

let idCounter = 0
const genId = () => `toast_${++idCounter}`

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],

    show: (config) => {
        const id = config.id ?? genId()
        set(state => ({
            toasts: [...state.toasts, { ...config, id }],
        }))
    },

    hide: (id) => {
        set(state => ({
            toasts: state.toasts.filter(t => t.id !== id),
        }))
    },

    hideAll: () => set({ toasts: [] }),
}))

// Convenience helper — call anywhere without a hook
export const toast = {
    show: (config: ToastConfig) => useToastStore.getState().show(config),
    hide: (id: string) => useToastStore.getState().hide(id),
    hideAll: () => useToastStore.getState().hideAll(),
    success: (title: string, subtitle?: string) =>
        useToastStore.getState().show({ type: 'success', title, subtitle }),
    error: (title: string, subtitle?: string) =>
        useToastStore.getState().show({ type: 'error', title, subtitle }),
    warning: (title: string, subtitle?: string) =>
        useToastStore.getState().show({ type: 'warning', title, subtitle }),
    info: (title: string, subtitle?: string) =>
        useToastStore.getState().show({ type: 'info', title, subtitle }),
}