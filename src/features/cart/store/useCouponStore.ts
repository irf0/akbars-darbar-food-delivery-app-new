import { create } from 'zustand';
import { Coupon } from 'src/global/services/couponService';

interface CouponStore {
  appliedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
}

export const useCouponStore = create<CouponStore>((set) => ({
  appliedCoupon: null,

  applyCoupon: (coupon) =>
    set({
      appliedCoupon: coupon,
    }),

  removeCoupon: () =>
    set({
      appliedCoupon: null,
    }),
}));
