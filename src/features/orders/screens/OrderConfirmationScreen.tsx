import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp, useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@theme';
import { useOrderConfirmation } from '../hooks/useOrderConfirmation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';

type OrderConfirmationRouteParams = {
  OrderConfirmation: { orderId: string; live?: boolean };
};

const formatRupees = (paise: number) => `₹${(paise / 100).toFixed(2)}`;

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  placed: { label: 'Order Placed', color: '#B8860B', bg: '#FFF7E0' },
  preparing: { label: 'Preparing', color: '#B8860B', bg: '#FFF7E0' },
  ready: { label: 'Ready', color: '#1565C0', bg: '#E3F2FD' },
  completed: { label: 'Completed', color: '#2E7D32', bg: '#E8F5E9' },
  cancelled: { label: 'Cancelled', color: '#C62828', bg: '#FDECEA' },
};

const OrderConfirmationScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const route = useRoute<RouteProp<OrderConfirmationRouteParams, 'OrderConfirmation'>>();
  const { orderId, live = false } = route.params;
  const { order, loading, error } = useOrderConfirmation(orderId);

  const handleBack = () => {
    if (live) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
        }),
      );
    } else {
      navigation.goBack();
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Confirming your order...</Text>
      </View>
    );
  }

  if (error || !order) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={40} color="#C62828" />
        <Text style={styles.errorText}>
          {`We couldn't load your order right now. If you were charged, please check back shortly or
          contact support.`}
        </Text>
      </View>
    );
  }

  const statusInfo = STATUS_CONFIG[order.orderStatus] ?? STATUS_CONFIG.placed;
  const isTerminal = order.orderStatus === 'completed' || order.orderStatus === 'cancelled';

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <TouchableOpacity onPress={handleBack} style={styles.floatingBack}>
        <Ionicons name="arrow-back" size={20} color="#111" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* HEADER CARD */}

        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.orderLabel}>ORDER NUMBER</Text>
              <Text style={styles.orderNumber}>{order.orderNumber}</Text>
            </View>
            <View style={[styles.statusPill, { backgroundColor: statusInfo.bg }]}>
              <Text style={[styles.statusPillText, { color: statusInfo.color }]}>
                {statusInfo.label}
              </Text>
            </View>
          </View>

          {order.orderType === 'takeaway' && order.takeawaySlot && (
            <View style={styles.slotRow}>
              <Ionicons name="time-outline" size={16} color="#888" />
              <Text style={styles.slotText}>Pickup at {order.takeawaySlot}</Text>
            </View>
          )}
        </View>

        {/* OTP CARD */}
        {!isTerminal && (
          <View style={styles.otpCard}>
            <Text style={styles.otpLabel}>
              Show this code on {order.orderType === 'delivery' ? 'delivery' : 'pickup'}
            </Text>
            <View style={styles.otpBoxRow}>
              {order.deliveryOtp.split('').map((digit, i) => (
                <View key={i} style={styles.otpBox}>
                  <Text style={styles.otpDigit}>{digit}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ITEMS CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Items</Text>
          {order.lineItems.map((item, i) => (
            <View key={i} style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemQty}>{item.quantity}x</Text>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPortion}>{item.portion}</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>{formatRupees(item.lineTotal)}</Text>
            </View>
          ))}
        </View>

        {/* BILL CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Bill Details</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Subtotal</Text>
            <Text style={styles.billValue}>{formatRupees(order.bill.itemsSubtotal)}</Text>
          </View>
          {order.bill.deliveryCharge > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Charge</Text>
              <Text style={styles.billValue}>{formatRupees(order.bill.deliveryCharge)}</Text>
            </View>
          )}
          {order.bill.packingCharge > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Packing Charge</Text>
              <Text style={styles.billValue}>{formatRupees(order.bill.packingCharge)}</Text>
            </View>
          )}
          {order.bill.platformFee > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Platform Fee</Text>
              <Text style={styles.billValue}>{formatRupees(order.bill.platformFee)}</Text>
            </View>
          )}
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>CGST</Text>
            <Text style={styles.billValue}>{formatRupees(order.bill.cgstAmount)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>SGST</Text>
            <Text style={styles.billValue}>{formatRupees(order.bill.sgstAmount)}</Text>
          </View>

          {order.bill.discount > 0 && (
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, styles.discountText]}>
                Discount
                {order.bill.appliedCoupon ? ` (${order.bill.appliedCoupon.code})` : ''}
              </Text>
              <Text style={[styles.billValue, styles.discountText]}>
                -{formatRupees(order.bill.discount)}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.billRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatRupees(order.bill.total)}</Text>
          </View>
        </View>

        {/* PAYMENT STATUS */}
        <View style={styles.paymentBadge}>
          <Ionicons
            name={order.paymentStatus === 'cod_pending' ? 'cash-outline' : 'checkmark-circle'}
            size={16}
            color={order.paymentStatus === 'cod_pending' ? '#B8860B' : '#2E7D32'}
          />
          <Text style={styles.paymentText}>
            {order.paymentStatus === 'cod_pending' ? 'Pay on pickup' : 'Payment successful'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 64, // extra room for the floating back button
    paddingBottom: 40,
    backgroundColor: '#F5F5F5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  loadingText: { marginTop: 12, color: '#666' },
  errorText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 15,
    lineHeight: 22,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  headerCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    letterSpacing: 0.5,
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  slotText: {
    fontSize: 14,
    color: '#555',
  },

  otpCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E4D0',
    borderStyle: 'dashed',
  },
  otpLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 12,
  },
  otpBoxRow: {
    flexDirection: 'row',
    gap: 10,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: 10,
    backgroundColor: theme.colors.primary + '12',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpDigit: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primary,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 14,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  itemLeft: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  itemQty: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
    width: 26,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  itemPortion: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 13.5,
    color: '#777',
  },
  billValue: {
    fontSize: 13.5,
    color: '#333',
    fontWeight: '500',
  },
  discountText: {
    color: '#2E7D32',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primary,
  },

  paymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  paymentText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  floatingBack: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
