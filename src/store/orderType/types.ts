export type OrderType = 'delivery' | 'takeaway' | null

export type OrderTypeStore = {
    orderType: OrderType
    setOrderType: (type: 'delivery' | 'takeaway') => void
    clearOrderType: () => void
}