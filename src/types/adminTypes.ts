// src/types/adminTypes.ts

export type AdminConfig = {
  isShopClosed: boolean;
  openingTime: string;
  closingTime: string;
  deliveryEnabled: boolean;
  takeawayEnabled: boolean;
  isCODEnabled: boolean;
  platformFee: number;
  discountPercentage: number;
  deliveryDiscountPercentage: number;
  takeawayDiscountPercentage: number;
  hikedPercentage: number;
  restaurantLat: number;
  restaurantLng: number;
  cgstRate: number;
  sgstRate: number;
  deliveryCharge: number;
  packingCharge: number;
};
