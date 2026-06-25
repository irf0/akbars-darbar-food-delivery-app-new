import { MenuItem } from "types";
import { create } from "zustand";


interface SearchStoreState {
    items: MenuItem[]
    isLoading: boolean
    setItems: (items: MenuItem[]) => void
    setLoading: (isLoading: boolean) => void
}


export const useMenuSearchStore = create<SearchStoreState>((set) => ({
    items: [],
    isLoading: true,
    setItems: (updatedItems) => set({ items: updatedItems }),
    setLoading: (isLoading) => set({ isLoading: isLoading })
}))

