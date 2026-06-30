import { useMemo } from 'react'
import { useCartStore } from '@store/useCartStore'
import { useOrderTypeStore } from '@store/useOrderTypeStore'
import { getPriceForPortion } from '@utils/getPriceForPortion'

export const useCartTotal = () => {
    const items = useCartStore(s => s.items)
    const orderType = useOrderTypeStore(s => s.orderType) as 'delivery' | 'takeaway'

    return useMemo(
        () => items.reduce((sum, i) => sum + i.quantity * getPriceForPortion(i, orderType), 0),
        [items, orderType]
    )
}