import { useEffect } from 'react';
import { MenuItem } from '@types';
import { useMenuStore } from '@store/useMenuStore';
import { Collections } from '@config/firebase';


export const useMenu = () => {
    const setLoading = useMenuStore((state) => state.setLoading)
    const setItems = useMenuStore((state) => state.setItems)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = Collections.menu.onSnapshot((querySnapshot) => {
            const items: MenuItem[] = []
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                items.push({
                    id: doc.id,
                    ...doc.data(),
                } as MenuItem)
            })
            setItems(items);
            setLoading(false);
        },
            (error) => {
                console.error("Firestore snapshot error:", error);
                setLoading(false);
            }
        )

        return () => {
            unsubscribe()
        }
    }, [])


}

