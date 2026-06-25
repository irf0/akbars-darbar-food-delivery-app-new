import firestore from '@react-native-firebase/firestore'
import { MenuByCategory, MenuItem } from '../../../types/index'

export function listenMenu(
    onData: (data: MenuByCategory) => void,
    onError: (error: Error) => void
) {
    return firestore()
        .collection('menu')
        .orderBy('category')
        .orderBy('subCategory')
        .onSnapshot(
            snapshot => {
                const grouped: MenuByCategory = {}

                snapshot.docs.forEach(doc => {
                    const item = { id: doc.id, ...doc.data() } as MenuItem
                    const { category, subCategory } = item

                    if (!grouped[category]) grouped[category] = {}
                    if (!grouped[category][subCategory]) grouped[category][subCategory] = []

                    grouped[category][subCategory].push(item)
                })

                onData(grouped)
            },
            onError
        )
}

export function searchMenu(menu: MenuByCategory, query: string): MenuItem[] {
    const lowerQuery = query.trim().toLowerCase()
    if (!lowerQuery) return []

    const results: MenuItem[] = []

    Object.values(menu).forEach(subcategories => {
        Object.values(subcategories).forEach(items => {
            items.forEach(item => {
                if (item.name.toLowerCase().includes(lowerQuery)) {
                    results.push(item)
                }
            })
        })
    })

    return results
}