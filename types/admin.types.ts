export interface AdminSettings {
    isShopClosed: boolean
    openingTime: number
    closingTime: string
    deliveryEnabled: boolean
    takeawayEnabled: boolean
    isCODEnabled: boolean
    discountPercentage: number
    deliveryDiscountPercentage: number
    takeawayDiscountPercentage: number
    hikedPercentage: number
    platformFee: number
}