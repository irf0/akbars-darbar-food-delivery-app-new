import { AdminConfig } from '@types';
import { adminDoc } from '@config/firebase';

const SHOP_CONFIG_DOC_ID = 'vBwzYuteA3P4UHKPHrpP'; //TODO: Rename to shopconfig later.

export const subscribeToAdminSettings = (
  onData: (settings: AdminConfig) => void,
  onError: (error: Error) => void,
): (() => void) => {
  const unsubscribe = adminDoc(SHOP_CONFIG_DOC_ID).onSnapshot(
    (doc) => {
      console.log('Snapshot exists:', doc.exists);
      console.log('Snapshot data:', doc.data());

      onData(doc.data() as AdminConfig);
    },
    (error) => {
      console.error('Firestore snapshot error:', error);
      onError(error);
    },
  );

  return unsubscribe;
};
