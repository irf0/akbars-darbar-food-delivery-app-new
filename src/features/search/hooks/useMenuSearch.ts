import { useMemo, useState } from "react";
import { useMenuSearchStore } from "../store/useMenuSearchStore";


export const useMenuSearch = () => {
    const items = useMenuSearchStore((state) => state.items);
    const loading = useMenuSearchStore((state) => state.isLoading);
    const [searchQuery, setSearchQuery] = useState('')

    const filteredItems = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const formattedQuery = searchQuery.toLowerCase().trim();
        return items.filter((item) => {
            return (
                item.name?.toLowerCase().includes(formattedQuery) ||
                item.category?.toLowerCase().includes(formattedQuery) ||
                item.subCategory?.toLowerCase().includes(formattedQuery)
            );
        });

    }, [searchQuery, items])

    return {
        searchQuery,
        setSearchQuery,
        filteredItems,
        loading,
    };
}

