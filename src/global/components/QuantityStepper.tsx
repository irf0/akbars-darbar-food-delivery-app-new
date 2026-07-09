import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityStepper = ({ quantity, onIncrement, onDecrement }: QuantityStepperProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        disabled={quantity === 1}
        onPress={onDecrement}
        style={({ pressed }) => [
          styles.button,
          quantity === 1 && { opacity: 0.4 },
          pressed && quantity > 1 && styles.pressed,
        ]}
        hitSlop={8}>
        <AntDesign name="minus" size={16} color="#1f2937" />
      </Pressable>

      <Text style={styles.quantity}>{quantity}</Text>

      <Pressable
        onPress={onIncrement}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        hitSlop={8}>
        <AntDesign name="plus" size={16} color="#1f2937" />
      </Pressable>
    </View>
  );
};

export default QuantityStepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  pressed: {
    opacity: 0.6,
  },
  quantity: {
    fontSize: 15,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
    color: '#1f2937',
  },
});
