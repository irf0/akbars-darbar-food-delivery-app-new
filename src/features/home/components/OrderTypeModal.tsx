// features/home/components/OrderTypeBar.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import CustomAlertModal from '@components/CustomAlertModal';
import { theme } from '@theme';

type NavProp = NativeStackNavigationProp<AppStackParamList>;

export const OrderTypeBar = () => {
  const navigation = useNavigation<NavProp>();
  const orderType = useOrderTypeStore((state) => state.orderType);
  const address = useOrderTypeStore((state) => state.address);
  const setPickup = useOrderTypeStore((state) => state.setPickup);
  const [showSwitchModal, setShowSwitchModal] = useState(false);

  const isDelivery = orderType === 'delivery';

  const label = isDelivery
    ? `Delivering to,  ${address?.formattedAddress}` || 'Delivering to your location'
    : 'Takeaway from restaurant';

  const handleSwitchConfirm = () => {
    setShowSwitchModal(false);
    if (isDelivery) {
      setPickup();
    } else {
      navigation.navigate('AddressList');
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.bar}
        activeOpacity={0.8}
        onPress={() => setShowSwitchModal(true)}>
        <Ionicons
          name={isDelivery ? 'bicycle' : 'bag-handle'}
          size={18}
          color={theme.colors.primary}
        />
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <CustomAlertModal
        visible={showSwitchModal}
        title={isDelivery ? 'Switch to Takeaway?' : 'Switch to Delivery?'}
        message={
          isDelivery
            ? 'Prices will update to takeaway pricing.'
            : "You'll need to confirm a delivery address."
        }
        icon={
          <Ionicons
            name={isDelivery ? 'bag-handle' : 'bicycle'}
            size={30}
            color={theme.colors.primary}
          />
        }
        cancelText="Cancel"
        confirmText={isDelivery ? 'Switch to Takeaway' : 'Choose Address'}
        onCancel={() => setShowSwitchModal(false)}
        onConfirm={handleSwitchConfirm}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  label: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
  },
});
