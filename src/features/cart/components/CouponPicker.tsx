import React from 'react';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Coupon } from 'src/global/services/couponService';

type Props = {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  coupons: Coupon[];
  subtotal: number;
  onApply: (coupon: Coupon) => void;
};

const CouponPicker = ({ bottomSheetRef, coupons, subtotal, onApply }: Props) => {
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

            return (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.code}>{item.code}</Text>

                  <Text style={styles.description}>{item.description}</Text>

                  {eligible ? (
                    <Text style={styles.eligible}>Eligible</Text>
                  ) : (
                    <Text style={styles.locked}>
                      Spend ₹{item.minOrderAmount - subtotal} more to unlock
                    </Text>
                  )}
                </View>

                {eligible && (
                  <Pressable onPress={() => onApply(item)} style={styles.applyButton}>
                    <Text style={styles.applyText}>Apply</Text>
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

  code: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

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
});
