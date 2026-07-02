import { useMenuStore } from "@store/useMenuStore"
import { useMemo } from "react"


const useBestSellers = () => {
    const items = useMenuStore((state) => state.items)

    const bestSellers = useMemo(() => {
        const bestSellerItems = items?.filter((item) => item.bestSeller)
        return bestSellerItems
    }, [items])
    return { bestSellers }
}

export default useBestSellers