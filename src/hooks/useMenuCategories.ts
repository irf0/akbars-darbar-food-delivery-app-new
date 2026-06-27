import { useMenuSearchStore } from "@features/search/store/useMenuSearchStore";
import { useMemo } from "react";


const useMenuCategories = () => {
    const items = useMenuSearchStore((state) => state.items);

    const categories = useMemo(() => {
        const rawCategories = items.map((item) => item?.category);
        const filteredCategories = rawCategories.filter(item => item.toLowerCase() !== 'extras')
        return [...new Set(filteredCategories)];
    }, [items]);
    return { categories };



}

export default useMenuCategories