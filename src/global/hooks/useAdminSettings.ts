import { useEffect } from 'react';
import { useAdminSettingsStore } from '@store/useAdminSettingsStore';
import { subscribeToAdminSettings } from 'src/global/services/adminSettingsService';

export const useAdminSettings = () => {
  const setLoading = useAdminSettingsStore((state) => state.setLoading);
  const setAdminSettings = useAdminSettingsStore((state) => state.setAdminSettings);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = subscribeToAdminSettings(
      (settings) => {
        setAdminSettings(settings);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);
};
