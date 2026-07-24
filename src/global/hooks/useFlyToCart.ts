import { findNodeHandle, UIManager } from 'react-native';
import { Image } from 'expo-image';
import { useFlyToCartStore } from '@store/useFlyToCartStore';

type FlyParams = {
  id: string;
  image: string;
  imageRef: Image | null;
};

export const useFlyToCart = () => {
  const fly = useFlyToCartStore((state) => state.fly);

  return ({ id, image, imageRef }: FlyParams) => {
    if (!imageRef) return;

    const node = findNodeHandle(imageRef);
    if (!node) return;

    UIManager.measureInWindow(node, (x, y, width, height) => {
      fly({
        id,
        image,
        startX: x,
        startY: y,
        startWidth: width,
        startHeight: height,
      });
    });
  };
};
