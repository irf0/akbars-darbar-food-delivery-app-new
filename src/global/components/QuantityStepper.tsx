import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '@theme';
import { haptics } from 'src/theme/haptics';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantityStepper = ({ quantity, onIncrement, onDecrement }: QuantityStepperProps) => {
  const handleIncrement = () => {
    haptics.tap();
    onIncrement();
  };

  const handleDecrement = () => {
    haptics.tap();
    onDecrement();
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleDecrement}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        hitSlop={6}>
        <AntDesign name="minus" size={14} color={theme.colors.primary} />
      </Pressable>

      <Text style={styles.quantity}>{quantity}</Text>

      <Pressable
        onPress={handleIncrement}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        hitSlop={6}>
        <AntDesign name="plus" size={14} color={theme.colors.primary} />
      </Pressable>
    </View>
  );
};

export default QuantityStepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  button: {
    width: 35,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: theme.colors.primary + '15', // light tint on press
  },
  quantity: {
    minWidth: 22,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});
