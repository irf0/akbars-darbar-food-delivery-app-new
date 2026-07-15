import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { theme } from '@theme';

type NavProp = NativeStackNavigationProp<AppStackParamList>;

export const DeliveryAddressChange = () => {
  const navigation = useNavigation<NavProp>();
  const orderType = useOrderTypeStore((state) => state.orderType);
  const address = useOrderTypeStore((state) => state.address);

  const isDelivery = orderType === 'delivery';

  const label = isDelivery
    ? `Delivering to,  ${address?.formattedAddress}` || 'Delivering to your location'
    : 'Takeaway from restaurant';

  return (
    <>
      <View style={styles.bar}>
        <Ionicons
          name={isDelivery ? 'bicycle' : 'bag-handle'}
          size={18}
          color={theme.colors.primary}
        />
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddressList')}>
          {orderType === 'delivery' && <Text style={styles.changeTxt}>{'change'}</Text>}
        </TouchableOpacity>
      </View>
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
  changeTxt: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
