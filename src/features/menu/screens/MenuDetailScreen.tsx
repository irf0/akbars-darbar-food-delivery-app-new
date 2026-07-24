import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DietBadge } from 'src/global/components/DietBadge';
import { usePortionSelectorStore } from '@store/usePortionSelectorStore';
import { useCartStore } from '@store/useCartStore';
import { useToastStore } from '@store/useToastStore';
import { haptics } from 'src/theme/haptics';
import { theme } from 'src/theme';

import MenuScreenHeader from '../components/MenuScreenHeader';

const t = theme;

type Props = NativeStackScreenProps<AppStackParamList, 'MenuDetail'>;

const MenuDetailScreen = ({ route }: Props) => {
  const { item } = route.params;
  const { addItem } = useCartStore();
  const openModal = usePortionSelectorStore((state) => state.openModal);
  const toast = useToastStore.getState();

  const isUnavailable = !item.available || item.isOutOfStock;
  const halfPrice = item.base_half_price;

  const handleAddPress = useCallback(() => {
    if (isUnavailable) return;

    if (!halfPrice || halfPrice === 0) {
      addItem(item, 'full', 1);
      haptics.success();
      toast.show({
        message: 'Added to cart',
        type: 'success',
      });
    } else {
      openModal(item);
    }
  }, [addItem, halfPrice, isUnavailable, item, openModal, toast]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MenuScreenHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image
            cachePolicy="memory-disk"
            source={{ uri: item.image }}
            style={[styles.itemImage, isUnavailable && styles.itemImageDisabled]}
            contentFit="cover"
            transition={200}
          />

          {isUnavailable && (
            <View style={styles.unavailableOverlay}>
              <Text style={styles.unavailableOverlayText}>Not available right now</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View>
            <DietBadge type={item.item_type} />
          </View>
          <Text style={[styles.name, isUnavailable && styles.textDisabled]}>{item.name}</Text>
          {!!item.description && (
            <Text style={[styles.description, isUnavailable && styles.textDisabled]}>
              {item.description}
            </Text>
          )}

          <View style={styles.priceRow}>
            {halfPrice > 0 && (
              <View style={[styles.priceChip, isUnavailable && styles.priceChipDisabled]}>
                <Text style={[styles.priceLabel, isUnavailable && styles.textDisabled]}>
                  {item.halfPortion}
                </Text>
                <Text style={[styles.priceValue, isUnavailable && styles.textDisabled]}>
                  ₹{halfPrice}
                </Text>
              </View>
            )}
            <View style={[styles.priceChip, isUnavailable && styles.priceChipDisabled]}>
              <Text style={[styles.priceLabel, isUnavailable && styles.textDisabled]}>
                {item.fullPortion}
              </Text>
              <Text style={[styles.priceValue, isUnavailable && styles.textDisabled]}>
                ₹{item.base_full_price}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.addButton, isUnavailable && styles.addButtonDisabled]}
          onPress={handleAddPress}
          activeOpacity={isUnavailable ? 1 : 0.85}
          disabled={isUnavailable}>
          <Text style={styles.addButtonText}>
            {isUnavailable ? 'CURRENTLY UNAVAILABLE' : 'ADD TO CART'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MenuDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: t.colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: t.spacing.xxl * 2,
  },
  imageWrapper: {
    position: 'relative',
    paddingHorizontal: t.spacing.md,
    paddingTop: t.spacing.md,
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: t.colors.border,
  },
  itemImageDisabled: {
    opacity: 0.4,
  },
  badgeWrapper: {
    position: 'absolute',
    top: t.spacing.md + 8,
    left: t.spacing.md + 8,
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: t.spacing.md,
    right: t.spacing.md,
    bottom: 0,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unavailableOverlayText: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: t.spacing.md,
    marginTop: t.spacing.md,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: t.colors.text ?? '#1A1A1A',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginTop: 6,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: t.spacing.md,
  },
  priceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: t.colors.surface ?? '#F5F5F5',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: t.colors.border,
  },
  priceChipDisabled: {
    opacity: 0.5,
  },
  priceLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  textDisabled: {
    opacity: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: t.spacing.md,
    paddingTop: t.spacing.md,
    paddingBottom: t.spacing.md,
    backgroundColor: t.colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: t.colors.border,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
  },
});
