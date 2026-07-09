export type ItemType = 'Veg' | 'Non-Veg';
export type PortionType = 'half' | 'full' | null;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  item_type: ItemType;
  image: string;
  available: boolean;
  availableAt: string;
  bestSeller: boolean;
  isOutOfStock: boolean;
  showPortionName?: boolean;
  halfPortion?: string;
  fullPortion?: string;
  half_delivery_price: number;
  half_takeaway_price: number;
  full_delivery_price: number;
  full_takeaway_price: number;
  base_full_price?: number; //new added in v2
  base_half_price?: number;
}

export type MenuByCategory = {
  [category: string]: {
    [subcategory: string]: MenuItem[];
  };
};

export interface MenuSection {
  title: string;
  category: string;
  data: MenuItem[];
}
