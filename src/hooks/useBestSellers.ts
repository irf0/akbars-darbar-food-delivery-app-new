import { useMenuSearchStore } from "@features/search/store/useMenuSearchStore"
import { useMemo } from "react"


const useBestSellers = () => {
    const items = useMenuSearchStore((state) => state.items)

    const bestSellers = useMemo(() => {
        const bestSellerItems = items?.filter((item) => item.bestSeller)
        return bestSellerItems
    }, [items])
    return { bestSellers }
}

export default useBestSellers