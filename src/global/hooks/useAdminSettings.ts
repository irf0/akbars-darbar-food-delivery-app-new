import { useEffect } from 'react';
import { useAdminSettingsStore } from '@store/useAdminSettingsStore';
import { AdminConfig } from '@types';
import { adminDoc } from '@config/firebase';

const SHOP_CONFIG_DOC_ID = 'vBwzYuteA3P4UHKPHrpP'; //TODO: Rename to shopconfig later.

export const useAdminSettings = () => {
  const setLoading = useAdminSettingsStore((state) => state.setLoading);
  const setAdminSettings = useAdminSettingsStore((state) => state.setAdminSettings);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = adminDoc(SHOP_CONFIG_DOC_ID).onSnapshot(
      (doc) => {
        if (doc.exists()) {
          setAdminSettings(doc.data() as AdminConfig);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Firestore snapshot error:', error);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);
};
