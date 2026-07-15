import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const CheckoutScreen = () => {
  const bill = useCheckoutBill();
  const orderType = useOrderTypeStore((state) => state.orderType) as 'delivery' | 'takeaway';
  const settings = useAdminSettingsStore((state) => state.settings);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const [cookingInstructions, setCookingInstructions] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

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
          </>
        )}
      />

      <TouchableOpacity style={styles.cta}>
        <Text style={styles.ctaText}>
          {orderType === 'delivery' ? `Pay ₹${bill.total.toFixed(0)}` : 'Proceed'}
        </Text>
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
