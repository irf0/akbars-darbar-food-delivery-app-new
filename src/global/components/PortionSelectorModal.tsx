import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { usePortionSelectorStore } from '@store/usePortionSelectorStore';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { Image } from 'expo-image';
import { DietBadge } from './DietBadge';
import { useCartStore } from '@store/useCartStore';
import { getPriceForPortion } from '@utils/getPriceForPortion';
import { theme } from '@theme';

export const PortionSelectorModal = () => {
  const isVisible = usePortionSelectorStore((state) => state.isVisible);
  const item = usePortionSelectorStore((state) => state.item);
  const portionType = usePortionSelectorStore((state) => state.portionType);
  const setPortionType = usePortionSelectorStore((state) => state.setPortionType);
  const closeModal = usePortionSelectorStore((state) => state.closeModal);
  const orderType = useOrderTypeStore((state) => state.orderType);
  const { addItem } = useCartStore();

  if (!item) return null;
  if (!orderType) return null;

  const halfPrice =
    item.base_half_price > 0 ? getPriceForPortion({ ...item, portion: 'half' }, orderType) : 0;
  const fullPrice = getPriceForPortion({ ...item, portion: 'full' }, orderType);

  const handleAddToCart = () => {
    if (!portionType) return null;
    addItem(item, portionType, 1);
    closeModal();
  };

  return (
    // TODO: Implement using @gorhom/bottom-sheet in UI Phase.
    <Modal visible={isVisible} onRequestClose={closeModal} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal} hitSlop={12}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <Image
            cachePolicy={'memory-disk'}
            source={{ uri: item.image }}
            style={styles.itemImage}
            contentFit="cover"
            transition={200}
          />
          <DietBadge type={item.item_type} />
          <Text style={styles.itemName}>{item.name}</Text>

          {halfPrice > 0 && (
            <TouchableOpacity style={styles.optionRow} onPress={() => setPortionType('half')}>
              <Text>{item.halfPortion}</Text>
              <Text>₹{halfPrice}</Text>
              <View style={[styles.radio, portionType === 'half' && styles.radioSelected]} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.optionRow} onPress={() => setPortionType('full')}>
            <Text>{item.fullPortion}</Text>
            <Text>₹{fullPrice}</Text>
            <View style={[styles.radio, portionType === 'full' && styles.radioSelected]} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.addButton, !portionType && styles.addButtonDisabled]}
            disabled={!portionType}
            onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 10,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#999',
  },
  radioSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  addButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
