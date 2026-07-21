import { create } from 'zustand';

export type DietFilter = 'all' | 'veg' | 'non-veg';
export type SortOption = 'none' | 'price-asc' | 'price-desc';

interface MenuFilterState {
  dietFilter: DietFilter;
  sortOption: SortOption;
  setDietFilter: (filter: DietFilter) => void;
  setSortOption: (sort: SortOption) => void;
}

export const useMenuFilterStore = create<MenuFilterState>((set) => ({
  dietFilter: 'all',
  sortOption: 'none',
  setDietFilter: (dietFilter) => set({ dietFilter }),
  setSortOption: (sortOption) => set({ sortOption }),
}));
