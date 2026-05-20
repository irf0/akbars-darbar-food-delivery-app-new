import firestore from '@react-native-firebase/firestore'
import { MenuItem, MenuByCategory } from '../../../types/menu.types'

// Listens to menu collection in real time
export const listenMenu = (
    onData: (menu: MenuByCategory) => void,
    onError?: (error: Error) => void
): (() => void) => {
    return firestore()
        .collection('menu')
        .orderBy('category', 'asc')
        .onSnapshot(
            (snapshot) => {
                const items: MenuItem[] = snapshot.docs.map((doc) => ({
                    ...(doc.data() as MenuItem),
                    id: doc.id,
                }))

                // Sort — Biryani always first
                items.sort((a, b) => {
                    if (a.category === 'Biryani') return -1
                    if (b.category === 'Biryani') return 1
                    return a.category.localeCompare(b.category)
                })

                // Group by category
                const grouped = items.reduce<MenuByCategory>((acc, item) => {
                    acc[item.category] = [...(acc[item.category] || []), item]
                    return acc
                }, {})

                onData(grouped)
            },
            (error) => onError?.(error)
        )
}

// Fetch extra menu (one time) 

export const fetchExtraMenu = async (): Promise<MenuItem[]> => {
    const snapshot = await firestore().collection('extramenu').get()
    return snapshot.docs.map((doc) => ({
        ...(doc.data() as MenuItem),
        id: doc.id,
    }))
}

// Search menu items 

export const searchMenu = (
    menu: MenuByCategory,
    query: string
): MenuItem[] => {
    if (!query.trim()) return []
    const lower = query.toLowerCase()
    return Object.values(menu)
        .flat()
        .filter(
            (item) =>
                item.name.toLowerCase().includes(lower) ||
                item.category.toLowerCase().includes(lower) ||
                item.subCategory.toLowerCase().includes(lower)
        )
}