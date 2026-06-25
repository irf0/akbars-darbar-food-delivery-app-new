import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useMenuSearchStore } from '../store/useMenuSearchStore';
import { MenuItem } from 'types';


export const useMenuSearchListener = () => {
    const setLoading = useMenuSearchStore((state) => state.setLoading)
    const setItems = useMenuSearchStore((state) => state.setItems)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = firestore().collection('menu').onSnapshot((querySnapshot) => {
            const items: MenuItem[] = []
            querySnapshot.forEach((doc) => {
                items.push({
                    id: doc.id,
                    ...doc.data()
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

