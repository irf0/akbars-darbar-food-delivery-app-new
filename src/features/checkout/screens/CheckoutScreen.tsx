// @ts-ignore - react-native-razorpay doesn't ship with official TS definitions
import RazorpayCheckout from 'react-native-razorpay';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DeliveryAddressChange } from '../components/DeliveryAddressChange';
import { TakeawayTimeSlotPicker } from '../components/TakeawayTimeSlotPicker';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { theme } from '@theme';
import { Ionicons } from '@expo/vector-icons';
import { useCheckoutBill } from '../hooks/useCheckoutBill';
import { useAdminSettingsStore } from '@store/useAdminSettingsStore';
import { generateTimeSlots } from '@utils/generateTimeSlotsForTakeaway';
import BillSummary from '../components/BillSummary';
import PriceDetails from '../components/PriceDetails';
import CheckoutInstructions from '../components/CheckoutInstructions';
import PaymentMethodSelector, { PaymentMethod } from '../components/PaymentMethodSelector';
import CustomAlertModal from '@components/CustomAlertModal';
import { createRazorpayOrder } from 'src/global/services/createRazorpayOrderService';
import { useCartStore } from '@store/useCartStore';
import { useCouponStore } from '@features/cart/store/useCouponStore';
import { verifyRazorpayPayment } from 'src/global/services/verifyRazorpayPaymentService';
import { createCodOrder } from 'src/global/services/createCodOrderService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';

const CheckoutScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const bill = useCheckoutBill();
  const address = useOrderTypeStore((state) => state.address);
  const cartItems = useCartStore((state) => state.items);
  const orderType = useOrderTypeStore((state) => state.orderType) as 'delivery' | 'takeaway';
  const settings = useAdminSettingsStore((state) => state.settings);
  const couponCode = useCouponStore((state) => state.appliedCoupon);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [showPickupTimeAlert, setShowPickupTimeAlert] = useState(false);

  const [cookingInstructions, setCookingInstructions] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [showVerificationFailedAlert, setShowVerificationFailedAlert] = useState(false);

  const openTime = settings?.openingTime ?? '11:00';
  const closeTime = settings?.closingTime ?? '22:00';

  const timeSlots = useMemo(
    () => generateTimeSlots(openTime, closeTime, new Date()),
    [openTime, closeTime],
  );

  const handleSlotSelect = (slot: Date) => {
    setSelectedSlot(slot);
    setIsTimePickerVisible(false);
  };

  const handleCloseTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  const handleCheckout = async () => {
    if (isProcessing) return;
    if (orderType === 'takeaway' && !selectedSlot) {
      setShowPickupTimeAlert(true);
      return;
    }

    setIsProcessing(true);

    try {
      const shouldUseOnlinePayment =
        orderType === 'delivery' || paymentMethod === 'online' || !settings?.isCODEnabled;

      if (shouldUseOnlinePayment) {
        try {
          const response = await createRazorpayOrder({
            orderType,
            addressId: orderType === 'delivery' ? address?.id : undefined,
            cartItems: cartItems.map((item) => ({
              id: item.id,
              portion: item.portion as 'half' | 'full',
              quantity: item.quantity,
            })),
            couponCode: couponCode?.code,
            cookingInstructions: cookingInstructions || undefined,
            deliveryInstructions:
              orderType === 'delivery' ? deliveryInstructions || undefined : undefined,
            takeawaySlot:
              orderType === 'takeaway'
                ? selectedSlot?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                : undefined,
          });

          const options = {
            key: 'rzp_live_TDhzAf5La795ue',
            order_id: response.razorpay_order_id,
            amount: response.amount,
            currency: response.currency,
            name: "Akbar's Darbar",
            description: 'Order payment',
            theme: { color: theme.colors.primary },
          };

          const paymentResult = await RazorpayCheckout.open(options);

          const verifyResponse = await verifyRazorpayPayment({
            razorpay_payment_id: paymentResult.razorpay_payment_id,
            razorpay_order_id: paymentResult.razorpay_order_id,
            razorpay_signature: paymentResult.razorpay_signature,
          });
          clearCart();
          navigation.navigate('OrderConfirmation', {
            orderId: verifyResponse.order_id,
            live: true,
          });
        } catch (error) {
          console.error('Payment or verification failed:', error);
          setShowVerificationFailedAlert(true);
          return;
        }
      } else {
        try {
          const codResponse = await createCodOrder({
            orderType: 'takeaway',
            cartItems: cartItems.map((item) => ({
              id: item.id,
              portion: item.portion as 'half' | 'full',
              quantity: item.quantity,
            })),
            couponCode: couponCode?.code,
            cookingInstructions: cookingInstructions || undefined,
            takeawaySlot: selectedSlot?.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          });
          clearCart();
          navigation.navigate('OrderConfirmation', { orderId: codResponse.order_id, live: true });
        } catch (error) {
          console.error('COD order creation failed:', error);
          return;
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };
  const isCashOnDeliveryOrder =
    orderType === 'takeaway' && settings?.isCODEnabled && paymentMethod === 'cod';

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ key: 'checkout' }]}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderItem={() => (
          <>
            {/* DELIVERY ADDRESS CHANGE  */}
            <DeliveryAddressChange />

            {/* TAKEAWAY TIME PICKER */}

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

            {/* ADDITIONAL INSTRUCTIONS */}
            <CheckoutInstructions
              cookingInstructions={cookingInstructions}
              deliveryInstructions={deliveryInstructions}
              onCookingInstructionsChange={setCookingInstructions}
              onDeliveryInstructionsChange={setDeliveryInstructions}
            />

            {/* BILL SUMMARY */}
            <BillSummary />

            {/* PRICE DETAILS */}
            <PriceDetails />

            {orderType === 'takeaway' && settings?.isCODEnabled && (
              <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
            )}

            {/* TAKEAWAY TIME SLOTS SHEET */}
            {isTimePickerVisible && (
              <TakeawayTimeSlotPicker
                visible
                slots={timeSlots}
                selectedSlot={selectedSlot}
                onSelect={handleSlotSelect}
                onClose={handleCloseTimePicker}
              />
            )}

            <CustomAlertModal
              visible={showPickupTimeAlert}
              title="Pickup time required"
              message="Please choose a pickup time before placing your order."
              icon={<Ionicons name="time-outline" size={32} color={theme.colors.primary} />}
              cancelText="Close"
              confirmText="Choose Time"
              onCancel={() => setShowPickupTimeAlert(false)}
              onConfirm={() => {
                setShowPickupTimeAlert(false);
                setIsTimePickerVisible(true);
              }}
            />

            <CustomAlertModal
              visible={showVerificationFailedAlert}
              title="Payment received"
              message="Your payment went through, but we're still confirming your order. Please check Order History in a moment. if it doesn't appear, contact support with your payment reference."
              icon={
                <Ionicons name="checkmark-circle-outline" size={32} color={theme.colors.primary} />
              }
              cancelText="Close"
              confirmText="View Orders"
              onCancel={() => setShowVerificationFailedAlert(false)}
              onConfirm={() => {
                setShowVerificationFailedAlert(false);
                // TODO: navigate to Order History screen once it exists
              }}
            />
          </>
        )}
      />

      <TouchableOpacity disabled={isProcessing} onPress={handleCheckout} style={styles.cta}>
        {isProcessing ? (
          <View>
            {/* //TODO: add dot animation */}
            <ActivityIndicator size={'small'} color={'#fff'} />
            <Text style={{ color: '#fff' }}>{'Processing...'}</Text>
          </View>
        ) : (
          <Text style={styles.ctaText}>
            {isCashOnDeliveryOrder ? 'Place Order' : `Pay ₹${bill.total.toFixed(0)}`}
          </Text>
        )}
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
});
