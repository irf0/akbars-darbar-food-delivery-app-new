import { create } from 'zustand';

export type FlyToCartTarget = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FlyAnimation = {
  id: string;
  image: string;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
};

type FlyToCartStore = {
  cartTarget: FlyToCartTarget | null;
  animation: FlyAnimation | null;
  setCartTarget: (target: FlyToCartTarget) => void;
  fly: (animation: FlyAnimation) => void;
  finish: () => void;
};

export const useFlyToCartStore = create<FlyToCartStore>((set) => ({
  cartTarget: null,
  animation: null,
  setCartTarget: (target) =>
    set({
      cartTarget: target,
    }),

  fly: (animation) =>
    set({
      animation,
    }),

  finish: () =>
    set({
      animation: null,
    }),
}));
