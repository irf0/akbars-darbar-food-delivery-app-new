import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { Image } from 'expo-image';
import { DietBadge } from 'src/global/components/DietBadge';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { usePortionSelectorStore } from '@store/usePortionSelectorStore';

type Props = NativeStackScreenProps<AppStackParamList, 'MenuDetail'>;

const MenuDetailScreen = ({ route, navigation }: Props) => {
  const { item } = route.params;
  const orderType = useOrderTypeStore((state) => state.orderType);
  const openModal = usePortionSelectorStore((state) => state.openModal);

  const halfPrice = orderType === 'delivery' ? item.half_delivery_price : item.half_takeaway_price;
  const fullPrice = orderType === 'delivery' ? item.full_delivery_price : item.full_takeaway_price;

  const isUnavailable = !item.available || item.isOutOfStock;

  const handleAddPress = () => {
    if (halfPrice === 0) {
      console.log('Directly add to cart!', item);
    } else {
      openModal(item);
    }
  };

  return (
    <View>
      <Image
        cachePolicy={'memory-disk'}
        source={{ uri: item.image }}
        style={styles.itemImage}
        contentFit="cover"
        transition={200}
      />
      <DietBadge type={item.item_type} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.priceRow}>
        {halfPrice > 0 && (
          <Text style={styles.priceText}>
            {item.halfPortion}: ₹{halfPrice}
          </Text>
        )}
        <Text style={styles.priceText}>
          {item.fullPortion}: ₹{fullPrice}
        </Text>
      </View>

      {isUnavailable ? (
        <Text style={styles.unavailableText}>Currently not available</Text>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.addButtonText}>ADD TO CART</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MenuDetailScreen;

const styles = StyleSheet.create({
  itemImage: {
    width: 300,
    height: 300,
    borderRadius: 12,
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '600',
  },
  unavailableText: {
    color: '#C62828',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#2ECC71',
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
