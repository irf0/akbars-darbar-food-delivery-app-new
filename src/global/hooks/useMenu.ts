import { useEffect } from 'react';
import { useMenuStore } from '@store/useMenuStore';
import { subscribeToMenu } from 'src/global/services/menuService';

export const useMenu = () => {
  const setLoading = useMenuStore((state) => state.setLoading);
  const setItems = useMenuStore((state) => state.setItems);

  useEffect(() => {
    setLoading(true);

    // Call the isolated data service layer
    const unsubscribe = subscribeToMenu(
      (items) => {
        setItems(items);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore snapshot error:', error);
        setLoading(false);
      },
    );

    // Provide the clean unsubscriber function to React for cleanup
    return () => unsubscribe();
  }, [setLoading, setItems]);
};
