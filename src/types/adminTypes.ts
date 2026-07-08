// src/types/adminTypes.ts

export type AdminConfig = {
    isShopClosed: boolean
    openingTime: number
    closingTime: string        //TODO make this number
    deliveryEnabled: boolean
    takeawayEnabled: boolean
    isCODEnabled: boolean
    platformFee: number
    discountPercentage: number
    deliveryDiscountPercentage: number
    takeawayDiscountPercentage: number
    hikedPercentage: number
    restaurantLat: number
    restaurantLng: number
}