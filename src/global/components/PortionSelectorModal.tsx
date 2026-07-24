import { Modal, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { usePortionSelectorStore } from '@store/usePortionSelectorStore';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { Image } from 'expo-image';
import { DietBadge } from './DietBadge';
import { useCartStore } from '@store/useCartStore';
import { getPriceForPortion } from '@utils/getPriceForPortion';
import { theme } from '@theme';
import { AnimatedPressable } from '@components/ui/AnimatedPressable';
import { useFlyToCart } from '@hooks/useFlyToCart';
import { useToastStore } from '@store/useToastStore';

const t = theme;

export const PortionSelectorModal = () => {
  const isVisible = usePortionSelectorStore((state) => state.isVisible);
  const item = usePortionSelectorStore((state) => state.item);
  const portionType = usePortionSelectorStore((state) => state.portionType);
  const setPortionType = usePortionSelectorStore((state) => state.setPortionType);
  const closeModal = usePortionSelectorStore((state) => state.closeModal);
  const orderType = useOrderTypeStore((state) => state.orderType);
  const { addItem } = useCartStore();
  const toast = useToastStore.getState();
  const flyToCart = useFlyToCart();
  const imageRefs = useRef<Record<string, Image | null>>({});

  if (!item) return null;
  if (!orderType) return null;

  const halfPrice =
    item.base_half_price > 0 ? getPriceForPortion({ ...item, portion: 'half' }, orderType) : 0;
  const fullPrice = getPriceForPortion({ ...item, portion: 'full' }, orderType);

  const handleAddToCart = () => {
    if (!portionType) return;
    addItem(item, portionType, 1);
    flyToCart({
      id: item.id,
      image: item.image,
      imageRef: imageRefs.current[item.id],
    });
    toast.show({ message: 'Added to cart', type: 'success' });

    closeModal();
  };

  return (
    <Modal visible={isVisible} onRequestClose={closeModal} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <AnimatedPressable style={styles.closeButton} onPress={closeModal} hitSlop={12}>
            <Text style={styles.closeButtonText}>✕</Text>
          </AnimatedPressable>

          <Image
            ref={(ref) => {
              imageRefs.current[item?.id] = ref;
            }}
            cachePolicy={'memory-disk'}
            source={{ uri: item.image }}
            style={styles.itemImage}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.nameTextContainer}>
            <DietBadge type={item.item_type} />
            <Text style={styles.itemName}>{item.name}</Text>
          </View>

          {halfPrice > 0 && (
            <AnimatedPressable
              style={[styles.optionRow, portionType === 'half' && styles.optionRowSelected]}
              onPress={() => setPortionType('half')}>
              <Text style={styles.optionLabel}>{item.halfPortion}</Text>
              <Text style={styles.optionPrice}>₹{halfPrice}</Text>
              <View style={[styles.radio, portionType === 'half' && styles.radioSelected]} />
            </AnimatedPressable>
          )}

          <AnimatedPressable
            style={[styles.optionRow, portionType === 'full' && styles.optionRowSelected]}
            onPress={() => setPortionType('full')}>
            <Text style={styles.optionLabel}>{item.fullPortion}</Text>
            <Text style={styles.optionPrice}>₹{fullPrice}</Text>
            <View style={[styles.radio, portionType === 'full' && styles.radioSelected]} />
          </AnimatedPressable>

          <AnimatedPressable
            style={[styles.addButton, !portionType && styles.addButtonDisabled]}
            disabled={!portionType}
            onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>ADD TO CART</Text>
          </AnimatedPressable>
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
    backgroundColor: t.colors.surface,
    margin: t.spacing.lg,
    borderRadius: t.radius.xl,
    padding: t.spacing.lg,
    alignItems: 'center',
    shadowColor: t.colors.text,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 8,
  },
  nameTextContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  closeButton: {
    position: 'absolute',
    top: t.spacing.sm,
    right: t.spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: t.colors.background,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: t.fontSize.sm,
    color: t.colors.text,
    fontWeight: t.fontWeight.semibold,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: t.radius.md,
  },
  itemName: {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.semibold,
    color: t.colors.text,
    textAlignVertical: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: t.spacing.sm,
    paddingHorizontal: t.spacing.md,
    borderRadius: t.radius.md,
    backgroundColor: t.colors.background,
    marginTop: t.spacing.sm,
  },
  optionRowSelected: {
    backgroundColor: t.colors.surface,
    borderWidth: 1,
    borderColor: t.colors.primary,
  },
  optionLabel: {
    fontSize: t.fontSize.sm,
    fontWeight: t.fontWeight.medium,
    color: t.colors.text,
  },
  optionPrice: {
    fontSize: t.fontSize.sm,
    fontWeight: t.fontWeight.semibold,
    color: t.colors.text,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: t.colors.border,
  },
  radioSelected: {
    backgroundColor: t.colors.primary,
    borderColor: t.colors.primary,
  },
  addButton: {
    backgroundColor: t.colors.primary,
    paddingVertical: t.spacing.md,
    paddingHorizontal: t.spacing.lg,
    borderRadius: t.radius.md,
    marginTop: t.spacing.md,
    width: '100%',
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: t.fontWeight.bold,
  },
});
