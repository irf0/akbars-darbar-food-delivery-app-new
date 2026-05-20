export type ItemType = 'Veg' | 'Non-Veg'
export type PortionType = 'half' | 'full'

export interface MenuItem {
    id: string
    name: string
    description: string
    category: string
    subCategory: string
    item_type: ItemType
    image: string
    available: boolean
    availableAt: string
    bestSeller: boolean
    isOutOfStock: boolean
    showPortionName?: boolean
    halfPortion: string
    fullPortion: string
    half_delivery_price: number
    half_takeaway_price: number
    full_delivery_price: number
    full_takeaway_price: number
}

export type MenuByCategory = Record<string, MenuItem[]>