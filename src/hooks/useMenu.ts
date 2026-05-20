import { useState, useEffect } from 'react'
import { listenMenu, searchMenu } from '@services/firestore/menu'
import { MenuByCategory, MenuItem } from '../../types/index'

export const useMenu = () => {
    const [menu, setMenu] = useState<MenuByCategory>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = listenMenu(
            (data) => {
                setMenu(data)
                setLoading(false)
            },
            (error) => {
                console.error('Menu error:', error)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [])

    const search = (query: string): MenuItem[] => searchMenu(menu, query)

    return { menu, loading, search }
}