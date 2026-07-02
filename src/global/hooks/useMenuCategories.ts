import { useMenuStore } from "@store/useMenuStore";
import { useMemo } from "react";


const useMenuCategories = () => {
    const items = useMenuStore((state) => state.items);

    const categories = useMemo(() => {
        const rawCategories = items.map((item) => item?.category);
        const filteredCategories = rawCategories.filter(item => item.toLowerCase() !== 'extras')
        return [...new Set(filteredCategories)];
    }, [items]);
    return { categories };



}

export default useMenuCategories