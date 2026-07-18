import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { theme } from '@theme';

export type PaymentMethod = 'online' | 'cod';

type Props = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

const options = [
  {
    value: 'online' as const,
    title: 'Pay Online',
    subtitle: 'UPI, Cards, Net Banking',
    icon: 'card-outline',
  },
  {
    value: 'cod' as const,
    title: 'Cash on Pickup',
    subtitle: 'Pay when collecting your order',
    icon: 'cash-outline',
  },
];

const PaymentMethodSelector = ({ value, onChange }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Payment Method</Text>

      {options.map((option) => {
        const selected = value === option.value;

        return (
          <Pressable
            key={option.value}
            style={[styles.option, selected && styles.optionSelected]}
            onPress={() => onChange(option.value)}>
            <View style={styles.left}>
              <Ionicons name={option.icon as any} size={24} color={theme.colors.primary} />

              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>

                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              </View>
            </View>

            <Ionicons
              name={selected ? 'radio-button-on' : 'radio-button-off'}
              size={22}
              color={selected ? theme.colors.primary : '#AAA'}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default PaymentMethodSelector;

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

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },

  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginBottom: 12,
  },

  optionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F8FFF9',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  optionSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#777',
  },
});
