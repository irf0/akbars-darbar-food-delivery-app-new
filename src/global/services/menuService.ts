//Read From DB

import { Collections } from '@config/firebase';
import { MenuItem } from '@types';

export const subscribeToMenu = (
  onData: (items: MenuItem[]) => void,
  onError: (error: Error) => void,
) => {
  return Collections.menu.onSnapshot(
    (querySnapshot) => {
      const items: MenuItem[] = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        } as MenuItem);
      });
      onData(items);
    },
    (error) => {
      onError(error);
    },
  );
};
