import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { theme } from '@theme';
import { useOrderTypeStore } from '@store/useOrderTypeStore';

type Props = {
  cookingInstructions: string;
  deliveryInstructions: string;

  onCookingInstructionsChange: (text: string) => void;
  onDeliveryInstructionsChange: (text: string) => void;
};

const CheckoutInstructions = ({
  cookingInstructions,
  deliveryInstructions,
  onCookingInstructionsChange,
  onDeliveryInstructionsChange,
}: Props) => {
  const orderType = useOrderTypeStore((state) => state.orderType);
  const [isCookingExpanded, setIsCookingExpanded] = useState(false);
  const [isDeliveryExpanded, setIsDeliveryExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Additional Instructions</Text>

      {/* Cooking */}

      <Pressable
        style={styles.instructionHeader}
        onPress={() => setIsCookingExpanded((prev) => !prev)}>
        <View style={styles.instructionLeft}>
          <Ionicons name="restaurant-outline" size={22} color={theme.colors.primary} />

          <View style={styles.instructionContent}>
            <Text style={styles.instructionTitle}>Cooking Instructions</Text>

            <Text style={styles.instructionSubtitle}>Add a note for the restaurant</Text>
          </View>
        </View>

        <Ionicons name={isCookingExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="#999" />
      </Pressable>

      {isCookingExpanded && (
        <TextInput
          value={cookingInstructions}
          onChangeText={onCookingInstructionsChange}
          placeholder="e.g. Less spicy, no onions..."
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
          style={styles.instructionsInput}
        />
      )}

      {orderType === 'delivery' && (
        <View>
          <View style={styles.divider} />
          {/* Delivery */}

          <Pressable
            style={styles.instructionHeader}
            onPress={() => setIsDeliveryExpanded((prev) => !prev)}>
            <View style={styles.instructionLeft}>
              <Ionicons name="bicycle-outline" size={22} color={theme.colors.primary} />

              <View style={styles.instructionContent}>
                <Text style={styles.instructionTitle}>Delivery Instructions</Text>

                <Text style={styles.instructionSubtitle}>Add a note for the delivery partner</Text>
              </View>
            </View>

            <Ionicons
              name={isDeliveryExpanded ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#999"
            />
          </Pressable>

          {isDeliveryExpanded && (
            <TextInput
              value={deliveryInstructions}
              onChangeText={onDeliveryInstructionsChange}
              placeholder="e.g. Leave at the gate, ring the bell..."
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              style={styles.instructionsInput}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default CheckoutInstructions;

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

  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 12,
  },

  instructionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  instructionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  instructionContent: {
    marginLeft: 14,
    flex: 1,
  },

  instructionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  instructionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#777',
  },

  instructionsInput: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 90,
    fontSize: 15,
    color: '#111',
    backgroundColor: '#FAFAFA',
  },
});
