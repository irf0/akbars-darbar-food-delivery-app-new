import { Easing } from 'react-native-reanimated';

export const duration = {
  instant: 100,
  fast: 150,
  base: 250,
  slow: 400,
  slower: 600,
};

export const easing = {
  standard: Easing.bezier(0.4, 0.0, 0.2, 1), // general purpose, Material-ish
  decelerate: Easing.bezier(0.0, 0.0, 0.2, 1), // entrances — starts fast, settles softly
  accelerate: Easing.bezier(0.4, 0.0, 1, 1), // exits — starts slow, leaves quickly
  spring: {
    damping: 18,
    stiffness: 180,
    mass: 0.9,
  },
};
