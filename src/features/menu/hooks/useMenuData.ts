import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { collection, getDocs, getFirestore, doc, onSnapshot } from '@react-native-firebase/firestore'
import { MenuItem, MenuByCategory } from 'types'
import { menuCache } from '@utils/menuCache'

export type FilterType = 'veg' | 'nonVeg' | 'bestSeller' | null



const sortMenuItems = (items: MenuItem[]) => {
    const sorted = [...items]

    sorted.sort((a, b) => {
        if (a.category === 'Kachi Dum Biryani') return -1
        if (b.category === 'Kachi Dum Biryani') return 1

        const catA = a.category ?? ''
        const catB = b.category ?? ''

        return catA.localeCompare(catB)
    })

    return sorted
}

function groupItemsByCategory(items: MenuItem[]): MenuByCategory {
    const grouped: MenuByCategory = {}

    for (const item of items) {
        const key = item.subCategory || item.category

        if (grouped[key] === undefined) {
            grouped[key] = []
        }

        grouped[key].push(item)
    }

    return grouped
}


function filterItems(items: MenuItem[], filter: FilterType): MenuItem[] {
    if (filter === 'veg') return items.filter(item => item.item_type === 'Veg')
    if (filter === 'nonVeg') return items.filter(item => item.item_type === 'Non-Veg')
    if (filter === 'bestSeller') return items.filter(item => item.bestSeller === true)
    return items
}

function mergeAvailability(
    items: MenuItem[],
    availability: Record<string, boolean>
): MenuItem[] {
    return items.map(item => ({
        ...item,
        available: availability[item.id] ?? item.available,
    }))
}

export function useMenuData() {
    const [rawItems, setRawItems] = useState<MenuItem[]>([])
    const [availability, setAvailability] = useState<Record<string, boolean>>({})
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [filter, setFilter] = useState<FilterType>(null)

    const isMounted = useRef(true)

    const fetchMenuFromFirestore = useCallback(async () => {
        try {
            const db = getFirestore()
            const snapshot = await getDocs(collection(db, 'menu'))

            const items: MenuItem[] = snapshot.docs.map(document => ({
                ...document.data(),
                id: document.id,
            } as MenuItem))

            const sorted = sortMenuItems(items)

            if (isMounted.current) {
                setRawItems(sorted)
                menuCache.save(sorted)
            }
        } catch (error) {
            console.error('Menu fetch error:', error)
        }
    }, [])

    useEffect(() => {
        isMounted.current = true

        async function loadMenu() {
            const cached = menuCache.load()

            if (cached !== null) {
                setRawItems(cached.items)
                if (cached.isStale) {
                    await fetchMenuFromFirestore()
                }
                return
            }

            setIsLoading(true)
            await fetchMenuFromFirestore()
            setIsLoading(false)
        }

        loadMenu()

        return () => {
            isMounted.current = false
        }
    }, [fetchMenuFromFirestore])

    useEffect(() => {
        const db = getFirestore()
        const availabilityDoc = doc(db, 'restaurant', 'availability')

        const unsubscribe = onSnapshot(
            availabilityDoc,
            (snapshot) => {
                if (snapshot.exists() && isMounted.current) {
                    setAvailability(snapshot.data() as Record<string, boolean>)
                }
            },
            (error) => {
                console.error('Availability listener error:', error)
            }
        )

        return () => unsubscribe()
    }, [])

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true)
        menuCache.clear()
        await fetchMenuFromFirestore()
        setIsRefreshing(false)
    }, [fetchMenuFromFirestore])

    const toggleFilter = useCallback((selected: FilterType) => {
        setFilter(prev => prev === selected ? null : selected)
    }, [])

    const sections = useMemo(() => {
        const filtered = filterItems(rawItems, filter)
        const withAvailability = mergeAvailability(filtered, availability)
        const grouped = groupItemsByCategory(withAvailability)

        return Object.keys(grouped).map(title => ({
            title,
            data: grouped[title],
        }))
    }, [rawItems, filter, availability])

    return {
        sections,
        isLoading,
        isRefreshing,
        filter,
        toggleFilter,
        onRefresh,
    }
}