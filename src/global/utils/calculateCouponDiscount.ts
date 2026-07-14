import { Coupon } from 'src/global/services/couponService';

export const calculateCouponDiscount = (subtotal: number, coupon: Coupon | null): number => {
  if (!coupon) {
    return 0;
  }

  //checks if mov qualifies
  if (subtotal < coupon.minOrderAmount) {
    return 0;
  }

  //checks if its flat off or percentage based
  if (coupon.type === 'flat') {
    return coupon.value;
  }

  //calculates for ex, 10% of cart value
  const discount = (subtotal * coupon.value) / 100;

  //checks if the coupon has a max cap
  if (coupon.maxDiscount) {
    return Math.min(discount, coupon.maxDiscount); //compares if it qualifies or not
  }

  return discount;
};

//for ex, even if 20% of 1000 = Rs 200
//but if the maxDiscount is capped at Rs 150, it will cap the coupon to Rs 150 maximum
