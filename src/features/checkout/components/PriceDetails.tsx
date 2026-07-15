import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAdminSettingsStore } from '@store/useAdminSettingsStore';

import { useCheckoutBill } from '../hooks/useCheckoutBill';

import { theme } from '@theme';

const PriceDetails = () => {
  const { settings } = useAdminSettingsStore();

  const bill = useCheckoutBill();

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Price Details</Text>

      <View style={styles.billRow}>
        <Text style={styles.billLabel}>Items total</Text>
        <Text style={styles.billValue}>₹{bill.subtotal.toFixed(1)}</Text>
      </View>

      {bill.couponDiscount > 0 && (
        <View style={styles.billRow}>
          <Text style={styles.billLabel}>Coupon (SAVE 20)</Text>
          <Text style={styles.billValue}>-₹{bill.couponDiscount.toFixed(1)}</Text>
        </View>
      )}

      <View style={styles.billRow}>
        <Text style={styles.billLabel}>CGST ({settings?.cgstRate ?? 0}%)</Text>
        <Text style={styles.billValue}>₹{bill.cgst.toFixed(1)}</Text>
      </View>

      <View style={styles.billRow}>
        <Text style={styles.billLabel}>SGST ({settings?.sgstRate ?? 0}%)</Text>
        <Text style={styles.billValue}>₹{bill.sgst.toFixed(1)}</Text>
      </View>

      <View style={styles.billRow}>
        <Text style={styles.billLabel}>Packing Charge</Text>
        <Text style={styles.billValue}>₹{(settings?.packingCharge ?? 0).toFixed(1)}</Text>
      </View>

      <View style={styles.billRow}>
        <Text style={styles.billLabel}>Delivery Fee</Text>
        <Text style={styles.billValue}>
          {settings?.deliveryCharge === 0
            ? 'FREE'
            : `₹${(settings?.deliveryCharge ?? 0).toFixed(1)}`}
        </Text>
      </View>

      <View style={styles.billRow}>
        <Text style={styles.billLabel}>Platform Fee</Text>
        <Text style={styles.billValue}>₹{(settings?.platformFee ?? 0).toFixed(1)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Grand Total</Text>
        <Text style={styles.totalAmount}>₹{bill.total.toFixed(0)}</Text>
      </View>
    </View>
  );
};

export default PriceDetails;

const styles = StyleSheet.create({
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
});
