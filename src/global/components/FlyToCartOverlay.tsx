import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useFlyToCartStore } from '@store/useFlyToCartStore';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const FlyToCartOverlay = () => {
  const animation = useFlyToCartStore((state) => state.animation);
  const cartTarget = useFlyToCartStore((state) => state.cartTarget);
  const finish = useFlyToCartStore((state) => state.finish);

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (!animation || !cartTarget) return;

    x.value = animation.startX;
    y.value = animation.startY;
    scale.value = 1;
    opacity.value = 1;

    x.value = withTiming(cartTarget.x, {
      duration: 700,
    });

    y.value = withTiming(
      cartTarget.y,
      {
        duration: 700,
      },
      (finished) => {
        if (finished) {
          runOnJS(finish)();
        }
      },
    );

    scale.value = withTiming(0.35, {
      duration: 700,
    });

    opacity.value = withTiming(0, {
      duration: 700,
    });
  }, [animation, cartTarget]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!animation) return null;

  return (
    <AnimatedImage
      source={{ uri: animation.image }}
      style={[
        styles.image,
        animatedStyle,
        {
          width: animation.startWidth,
          height: animation.startHeight,
        },
      ]}
      contentFit="cover"
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 14,
    zIndex: 9999,

    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 20,
  },
});
