import { useMemo } from 'react';

import { useAdminSettingsStore } from '@store/useAdminSettingsStore';
import { useCouponStore } from '../../cart/store/useCouponStore';
import { useCartTotal } from '@hooks/useCartTotal';

import { calculateCouponDiscount } from '@utils/calculateCouponDiscount';

export const useCheckoutBill = () => {
  const { settings } = useAdminSettingsStore();

  const appliedCoupon = useCouponStore((state) => state.appliedCoupon);

  const cartTotal = useCartTotal();

  const platformFee = settings?.platformFee ?? 0;
  const deliveryFee = settings?.deliveryCharge ?? 0;
  const packagingFee = settings?.packingCharge ?? 0;

  const cgstRate = settings?.cgstRate ?? 0;
  const sgstRate = settings?.sgstRate ?? 0;

  return useMemo(() => {
    const subtotal = cartTotal;

    const couponDiscount = calculateCouponDiscount(subtotal, appliedCoupon);

    const discountedTotal = subtotal - couponDiscount;

    const taxableAmount = discountedTotal / (1 + (cgstRate + sgstRate) / 100);

    const gst = discountedTotal - taxableAmount;

    const cgst = gst / 2;
    const sgst = gst / 2;

    const total = discountedTotal + deliveryFee + platformFee + packagingFee;

    return {
      subtotal,
      couponDiscount,
      taxableAmount,
      cgst,
      sgst,
      total,
      platformFee,
      deliveryFee,
      packagingFee,
    };
  }, [cartTotal, appliedCoupon, cgstRate, sgstRate, platformFee, deliveryFee, packagingFee]);
};
