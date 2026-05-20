import { create } from 'zustand'

interface ThemeStore {
    resolved: 'light'
}

export const useThemeStore = create<ThemeStore>(() => ({
    resolved: 'light',
}))