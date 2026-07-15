import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useCartStore } from '@store/useCartStore';
import { useOrderTypeStore } from '@store/useOrderTypeStore';

import { getPriceForPortion } from '@utils/getPriceForPortion';

const BillSummary = () => {
  const { items } = useCartStore();

  const orderType = useOrderTypeStore((state) => state.orderType) as 'delivery' | 'takeaway';

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Bill Summary</Text>

      {items.map((item) => (
        <View key={`${item.id}-${item.portion}`} style={styles.itemRow}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>
              {item.name} ({item.portion})
            </Text>

            <Text style={styles.itemMeta}>Qty {item.quantity}</Text>
          </View>

          <Text style={styles.itemPrice}>
            ₹{item.quantity * getPriceForPortion(item, orderType)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default BillSummary;

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

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },

  itemInfo: {
    flex: 1,
    marginRight: 12,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  itemMeta: {
    marginTop: 4,
    fontSize: 13,
    color: '#777',
  },

  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
});
