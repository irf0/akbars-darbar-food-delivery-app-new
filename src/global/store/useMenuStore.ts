import { MenuItem } from "@types";
import { create } from "zustand";


interface MenuStoreState {
    items: MenuItem[]
    isLoading: boolean
    setItems: (items: MenuItem[]) => void
    setLoading: (isLoading: boolean) => void
}


export const useMenuStore = create<MenuStoreState>((set) => ({
    items: [],
    isLoading: true,
    setItems: (updatedItems) => set({ items: updatedItems }),
    setLoading: (isLoading) => set({ isLoading: isLoading })
}))

