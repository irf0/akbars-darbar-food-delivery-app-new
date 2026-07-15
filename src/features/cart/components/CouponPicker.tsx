import React from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Coupon } from 'src/global/services/couponService';
import { useCouponStore } from '../store/useCouponStore';

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  coupons: Coupon[];
  subtotal: number;
  onApply: (coupon: Coupon) => void;
};

const CouponPicker = ({ bottomSheetRef, coupons, subtotal, onApply }: Props) => {
  const appliedCoupon = useCouponStore((state) => state.appliedCoupon);
  return (
    <BottomSheetModal
      enableDynamicSizing={false}
      ref={bottomSheetRef}
      snapPoints={['45%']}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior="close"
        />
      )}>
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Offers & Coupons</Text>

        <FlatList
          data={coupons}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => {
            const eligible = subtotal >= item.minOrderAmount;

            const isApplied = appliedCoupon?.id === item.id;

            const hasAnotherCoupon = appliedCoupon && appliedCoupon.id !== item.id;

            const offerTitle =
              item.type === 'flat'
                ? `₹${item.value} OFF`
                : item.maxDiscount
                  ? `${item.value}% OFF up to ₹${item.maxDiscount}`
                  : `${item.value}% OFF`;

            return (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.offerTitle}>{offerTitle}</Text>

                  <Text style={styles.code}>{item.code}</Text>

                  <Text style={styles.minOrder}>Min. order ₹{item.minOrderAmount}</Text>

                  {!eligible ? (
                    <Text style={styles.locked}>
                      Spend ₹{item.minOrderAmount - subtotal} more to unlock
                    </Text>
                  ) : (
                    <Text style={styles.eligible}>Eligible</Text>
                  )}
                </View>

                {eligible && (
                  <Pressable
                    disabled={isApplied}
                    onPress={() => onApply(item)}
                    style={[styles.applyButton, isApplied && styles.appliedButton]}>
                    <Text style={[styles.applyText, isApplied && styles.appliedText]}>
                      {isApplied ? 'Applied' : hasAnotherCoupon ? 'Replace' : 'Apply'}
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          }}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default CouponPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  separator: {
    height: 14,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#fff',

    borderRadius: 12,

    borderWidth: 1,
    borderColor: '#E5E7EB',

    padding: 16,
  },

  //   code: {
  //     fontSize: 16,
  //     fontWeight: '700',
  //     color: '#111827',
  //   },

  description: {
    marginTop: 6,
    color: '#6B7280',
    fontSize: 14,
  },

  eligible: {
    marginTop: 8,
    color: '#16A34A',
    fontWeight: '600',
  },

  locked: {
    marginTop: 8,
    color: '#EF4444',
    fontWeight: '500',
  },

  applyButton: {
    backgroundColor: '#E53935',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },

  applyText: {
    color: '#fff',
    fontWeight: '700',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  code: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },

  minOrder: {
    marginTop: 4,
    fontSize: 13,
    color: '#9CA3AF',
  },

  appliedButton: {
    backgroundColor: '#DCFCE7',
  },

  appliedText: {
    color: '#15803D',
  },
});
