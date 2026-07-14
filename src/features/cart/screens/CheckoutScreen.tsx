import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DeliveryAddressChange } from '../components/DeliveryAddressChange';
import { TakeawayTimeSlotPicker } from '../components/TakeawayTimeSlotPicker';

import { generateTimeSlots } from '@utils/generateTimeSlotsForTakeaway';
import { getPriceForPortion } from '@utils/getPriceForPortion';

import { useAdminSettingsStore } from '@store/useAdminSettingsStore';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { useCartStore } from '@store/useCartStore';

import { useCartTotal } from '@hooks/useCartTotal';

import { theme } from '@theme';
import { Ionicons } from '@expo/vector-icons';
import { useCouponStore } from '../store/useCouponStore';
import { calculateCouponDiscount } from '@utils/calculateCouponDiscount';

const CheckoutScreen = () => {
  const orderType = useOrderTypeStore((state) => state.orderType) as 'delivery' | 'takeaway';
  const { settings } = useAdminSettingsStore();
  const { items } = useCartStore();
  const appliedCoupon = useCouponStore((state) => state.appliedCoupon);
  const cartTotal = useCartTotal();

  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const openTime = settings?.openingTime ?? '11:00';
  const closeTime = settings?.closingTime ?? '22:00';

  const platformFee = settings?.platformFee ?? 0;
  const deliveryFee = 0;

  const cgstRate = settings?.cgstRate ?? 0;
  const sgstRate = settings?.sgstRate ?? 0;
  const discountRate = settings?.discountPercentage ?? 0;

  //THE BILL BREAKDOWN
  const bill = useMemo(() => {
    const subtotal = cartTotal;

    const storeDiscount = (subtotal * discountRate) / 100;

    const afterStoreDiscount = subtotal - storeDiscount;

    const couponDiscount = calculateCouponDiscount(afterStoreDiscount, appliedCoupon);

    const taxableAmount = afterStoreDiscount - couponDiscount;

    const cgst = (taxableAmount * cgstRate) / 100;
    const sgst = (taxableAmount * sgstRate) / 100;

    const total = taxableAmount + cgst + sgst + platformFee + deliveryFee;

    return {
      subtotal,
      storeDiscount,
      couponDiscount,
      taxableAmount,
      cgst,
      sgst,
      total,
    };
  }, [cartTotal, appliedCoupon, discountRate, cgstRate, sgstRate, platformFee, deliveryFee]);

  const timeSlots = useMemo(
    () => generateTimeSlots(openTime, closeTime, new Date()),
    [openTime, closeTime],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ key: 'checkout' }]}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={() => (
          <>
            <DeliveryAddressChange />

            {/* TAKEAWAY */}

            {orderType === 'takeaway' && (
              <Pressable
                style={({ pressed }) => [
                  styles.card,
                  styles.pickupCard,
                  pressed && styles.pickupCardPressed,
                ]}
                onPress={() => setIsTimePickerVisible(true)}>
                <View>
                  <Text style={styles.cardTitle}>Pickup Time</Text>

                  <Text style={styles.pickupSubtitle}>
                    {selectedSlot
                      ? selectedSlot.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Tap to choose a pickup time'}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={22} color="#999" />
              </Pressable>
            )}

            {/* BILL SUMMARY */}

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Bill Summary</Text>

              {items.map((item) => (
                <View key={`${item.id}-${item.portion}`} style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>
                      {item.name} ({item.portion})
                    </Text>

                    <Text style={styles.itemMeta}>Qty {item.quantity}</Text>
                  </View>

                  <Text style={styles.itemPrice}>
                    ₹{item.quantity * getPriceForPortion(item, orderType)}
                  </Text>
                </View>
              ))}
            </View>

            {/* PRICE DETAILS */}

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Price Details</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billValue}>₹{bill.subtotal.toFixed(1)}</Text>
              </View>

              {/* //TODO:connected it through coupon system later (from cart screen) that amount is less here */}

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Coupon (SAVE 20)</Text>
                <Text style={styles.billValue}>-₹{bill.couponDiscount.toFixed(1)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Taxable Amount</Text>
                <Text style={styles.billValue}>₹{bill.taxableAmount.toFixed(1)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>CGST ({settings?.cgstRate ?? 0}%)</Text>
                <Text style={styles.billValue}>₹{bill.cgst.toFixed(1)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>SGST ({settings?.sgstRate ?? 0}%)</Text>
                <Text style={styles.billValue}>₹{bill.sgst.toFixed(1)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text style={styles.billValue}>{'FREE'}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Platform Fee</Text>
                <Text style={styles.billValue}>₹{platformFee.toFixed(1)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalAmount}>₹{bill.total.toFixed(1)}</Text>
              </View>
            </View>

            {isTimePickerVisible && (
              <TakeawayTimeSlotPicker
                visible
                slots={timeSlots}
                selectedSlot={selectedSlot}
                onSelect={(slot) => {
                  setSelectedSlot(slot);
                  setIsTimePickerVisible(false);
                }}
                onClose={() => setIsTimePickerVisible(false)}
              />
            )}
          </>
        )}
      />

      <TouchableOpacity style={styles.cta}>
        <Text style={styles.ctaText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  content: {
    paddingVertical: 16,
    paddingBottom: 110,
  },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    padding: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 14,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },

  itemInfo: {
    flex: 1,
    marginRight: 12,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  itemMeta: {
    marginTop: 4,
    fontSize: 13,
    color: '#777',
  },

  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  billLabel: {
    fontSize: 15,
    color: '#444',
  },

  billValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 12,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  pickupTime: {
    fontSize: 15,
    color: '#666',
  },

  cta: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,

    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  ctaText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  pickupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pickupCardPressed: {
    opacity: 0.7,
  },

  pickupSubtitle: {
    marginTop: 4,
    fontSize: 15,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
