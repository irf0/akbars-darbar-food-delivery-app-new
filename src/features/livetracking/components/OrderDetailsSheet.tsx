import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { lightColors } from 'src/theme/colors';

interface LineItem {
  id: string;
  name: string;
  quantity: number;
  portion?: string;
}

interface RiderProfile {
  name: string;
  phone: string;
}

interface Props {
  orderNumber: string;
  lineItems: LineItem[];
  deliveryInstructions?: string | null;
  onDetailsPress: () => void;
  riderProfile?: RiderProfile | null;
}

const riderAvatar = require('../../../../assets/rider-avatar.png');

export function OrderDetailsSheet({
  orderNumber,
  lineItems,
  deliveryInstructions,
  onDetailsPress,
  riderProfile,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleCall = () => {
    if (!riderProfile?.phone) return;
    Linking.openURL(`tel:${riderProfile.phone}`).catch((err) =>
      console.error('Failed to open dialer:', err),
    );
  };

  return (
    <View style={styles.container}>
      {/* Rider section — only shown once a rider is assigned */}
      {riderProfile && (
        <>
          <View style={styles.riderRow}>
            <Image source={riderAvatar} style={styles.photo} />

            <View style={styles.riderInfo}>
              <Text style={styles.riderName}>{riderProfile.name}</Text>
            </View>

            <TouchableOpacity style={styles.callButton} onPress={handleCall}>
              <Feather name="phone" size={17} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />
        </>
      )}

      {/* Order section */}
      <Pressable style={styles.summaryRow} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.orderNumber}>Order #{orderNumber}</Text>
        <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color="#666" />
      </Pressable>

      {expanded && (
        <View style={styles.details}>
          {lineItems.map((item) => (
            <Text key={item.id} style={styles.itemText}>
              {item.quantity}× {item.name}
              {item.portion ? ` (${item.portion})` : ''}
            </Text>
          ))}

          {deliveryInstructions ? (
            <View style={styles.instructionsBox}>
              <Text style={styles.instructionsLabel}>Delivery instructions</Text>
              <Text style={styles.instructionsText}>{deliveryInstructions}</Text>
            </View>
          ) : null}
        </View>
      )}

      <Pressable style={styles.detailsButton} onPress={onDetailsPress}>
        <Text style={styles.detailsButtonText}>View Details</Text>
        <Feather name="chevron-right" size={16} color={lightColors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  riderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  photoPlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  riderName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  vehicle: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  callButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: lightColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  details: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  itemText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
  instructionsBox: {
    marginTop: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  instructionsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    marginBottom: 2,
  },
  instructionsText: {
    fontSize: 13,
    color: '#333',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 4,
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: lightColors.primary,
  },
});
