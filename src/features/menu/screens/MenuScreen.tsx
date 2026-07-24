import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import useFlattenedMenu from '@features/menu/hooks/useFlattenedMenu';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { usePortionSelectorStore } from '@store/usePortionSelectorStore';
import { MenuItem } from '@types';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList, BottomTabsParamList } from '@navigation/types';
import { useCartStore } from '@store/useCartStore';
import { theme } from 'src/theme';
import { haptics } from 'src/theme/haptics';
import { useToastStore } from '@store/useToastStore';
import { useFlyToCart } from '@hooks/useFlyToCart';

import MenuScreenHeader from '../components/MenuScreenHeader';
import CategoryHeader from '../components/Categoryheader';
import MenuRow from '../components/MenuRow';
import CartBar from '../components/CartBar';

const t = theme;

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Menu'>,
  NativeStackScreenProps<AppStackParamList>
>;

const MenuScreen = ({ navigation, route }: Props) => {
  const targetCategory = route.params?.category;
  const { flattenedMenu } = useFlattenedMenu(targetCategory);
  const orderType = useOrderTypeStore((state) => state.orderType);
  const openModal = usePortionSelectorStore((state) => state.openModal);
  const { addItem } = useCartStore();
  const toast = useToastStore.getState();
  const imageRefs = useRef<Record<string, Image | null>>({});
  const flyToCart = useFlyToCart();

  const stickyHeaderIndices = useMemo(
    () =>
      flattenedMenu.reduce<number[]>((acc, item, index) => {
        if (item.type === 'header') acc.push(index);
        return acc;
      }, []),
    [flattenedMenu],
  );

  const handleImageRef = useCallback((id: string, ref: Image | null) => {
    imageRefs.current[id] = ref;
  }, []);

  const handleRowPress = useCallback(
    (item: MenuItem) => {
      navigation.navigate('MenuDetail', { item });
    },
    [navigation],
  );

  const handleAddBtn = useCallback(
    (item: MenuItem) => {
      const halfPrice = item.base_half_price;

      if (!halfPrice || halfPrice === 0) {
        addItem(item, 'full', 1);
        haptics.success();

        flyToCart({
          id: item.id,
          image: item.image,
          imageRef: imageRefs.current[item.id],
        });

        toast.show({
          message: 'Added to cart',
          type: 'success',
        });
      } else {
        openModal(item);
      }
    },
    [addItem, flyToCart, openModal, toast],
  );

  const keyExtractor = useCallback(
    (item: (typeof flattenedMenu)[number]) =>
      item.type === 'header' ? item.subCategory : item.data.id,
    [],
  );

  const getItemType = useCallback((item: (typeof flattenedMenu)[number]) => item.type, []);

  const renderItem = useCallback(
    ({ item }: { item: (typeof flattenedMenu)[number] }) => {
      if (item.type === 'header') {
        return <CategoryHeader title={item.subCategory} />;
      }

      return (
        <MenuRow
          item={item.data}
          orderType={orderType}
          onPress={handleRowPress}
          onAdd={handleAddBtn}
          onImageRef={handleImageRef}
        />
      );
    },
    [orderType, handleRowPress, handleAddBtn, handleImageRef],
  );

  const renderSeparator = useCallback(() => <View style={styles.divider} />, []);

  const handleCartBarPress = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MenuScreenHeader />

      <FlashList
        data={flattenedMenu}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        stickyHeaderIndices={stickyHeaderIndices}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        removeClippedSubviews
      />

      <CartBar onPress={handleCartBarPress} />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: t.colors.background,
  },
  listContent: {
    paddingHorizontal: t.spacing.md,
    paddingBottom: t.spacing.xxl * 2, // clears the floating cart bar
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: t.colors.border,
  },
});
