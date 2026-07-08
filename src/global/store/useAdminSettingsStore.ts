import { AdminConfig } from '@types'
import { create } from 'zustand'

interface AdminStoreState {
    settings: AdminConfig | null
    isLoading: boolean
    setAdminSettings: (settings: AdminConfig) => void
    setLoading: (isLoading: boolean) => void
}


export const useAdminSettingsStore = create<AdminStoreState>((set) => ({
    settings: null,
    isLoading: true,
    setAdminSettings: (updatedSettings) => set({ settings: updatedSettings }),
    setLoading: (isLoading) => set({ isLoading }),
}))
