import React, { useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import useBestSellers from '@hooks/useBestSellers';
import { MenuItem } from '@types';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { getDisplayPrice } from '@utils/getDisplayPrice';
import { DietBadge } from 'src/global/components/DietBadge';
import { usePortionSelectorStore } from '@store/usePortionSelectorStore';
import { useCartStore } from '@store/useCartStore';
import { AnimatedPressable } from '@components/ui/AnimatedPressable';
import { theme } from 'src/theme';
import { haptics } from 'src/theme/haptics';
import { useToastStore } from '@store/useToastStore';
import { useFlyToCart } from '@hooks/useFlyToCart';

const t = theme;

const CARD_WIDTH = 188;
interface Props {
  onItemPress: (item: MenuItem) => void;
}

const BestSellerList = ({ onItemPress }: Props) => {
  const { bestSellers } = useBestSellers();
  const { orderType } = useOrderTypeStore();
  const openModal = usePortionSelectorStore((s) => s.openModal);
  const { addItem } = useCartStore();
  const toast = useToastStore.getState();
  const flyToCart = useFlyToCart();
  const imageRefs = useRef<Record<string, Image | null>>({});

  const handleAddBtn = (item: MenuItem) => {
    haptics.tap();

    if (!item.base_half_price || item.base_half_price === 0) {
      addItem(item, 'full', 1);
      haptics.success();
      flyToCart({
        id: item.id,
        image: item.image,
        imageRef: imageRefs.current[item.id],
      });
      toast.show({ message: 'Added to cart', type: 'success' });
    } else {
      openModal(item);
    }
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <Pressable onPress={() => onItemPress(item)}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            ref={(ref) => {
              imageRefs.current[item?.id] = ref;
            }}
            source={{ uri: item.image }}
            cachePolicy="memory-disk"
            transition={250}
            contentFit="fill"
            style={styles.image}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.nameTextContainer}>
            <DietBadge type={item.item_type} />
            <Text style={styles.title}>{item.name}</Text>
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.price}>₹{getDisplayPrice(item, orderType)}</Text>

            <AnimatedPressable onPress={() => handleAddBtn(item)} style={styles.addButton}>
              <Text style={styles.addText}>ADD</Text>
            </AnimatedPressable>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Our bestsellers</Text>
          <Text style={styles.subHeading}>Most loved dishes by our customers</Text>
        </View>
      </View>

      <FlatList
        horizontal
        data={bestSellers}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ?? String(index)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        decelerationRate="fast"
        snapToAlignment="start"
      />
    </View>
  );
};

export default BestSellerList;

const styles = StyleSheet.create({
  section: {
    marginBottom: t.spacing.xl,
  },

  header: {
    paddingHorizontal: 2,
    marginBottom: 18,
  },

  heading: {
    fontSize: t.fontSize.lg,
    fontWeight: t.fontWeight.bold,
    color: t.colors.text,
  },

  subHeading: {
    marginTop: 4,
    fontSize: 14,
    color: t.colors.textSecondary,
    fontWeight: '500',
  },

  listContent: {
    paddingBottom: 8,
    paddingRight: 20,
    gap: 18,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: t.colors.background,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    shadowOffset: { width: 0, height: 5 },
    overflow: 'hidden',
  },

  imageContainer: {
    height: 150,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },

  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
  },

  bestSellerChip: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.70)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
  },

  bestSellerText: {
    marginLeft: 4,
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  nameTextContainer: {
    flexDirection: 'row',
    gap: 5,
    // alignItems: 'center',
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    minHeight: 122,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.medium,
    color: t.colors.text,
    marginRight: 15,
    // lineHeight: 22,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: t.colors.textSecondary,
    minHeight: 36,
  },

  bottomRow: {
    marginTop: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontSize: t.fontSize.lg,
    fontWeight: t.fontWeight.semibold,
    color: t.colors.text,
  },

  addButton: {
    minWidth: 72,
    height: 36,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: t.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },

  addText: {
    marginLeft: 5,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
