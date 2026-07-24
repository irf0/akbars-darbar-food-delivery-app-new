import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { DietBadge } from 'src/global/components/DietBadge';
import { getDisplayPrice } from '@utils/getDisplayPrice';
import { MenuItem } from '@types';
import { theme } from 'src/theme';

const t = theme;

export type MenuRowProps = {
  item: MenuItem;
  orderType: 'delivery' | 'takeaway' | null;
  onPress: (item: MenuItem) => void;
  onAdd: (item: MenuItem) => void;
  onImageRef: (id: string, ref: Image | null) => void;
};

// Memoized so a row only re-renders when its own item or orderType changes.
// This is what lets the list stay cheap when unrelated state (e.g. the
// cart totals) changes elsewhere on screen.
const MenuRow = React.memo(
  ({ item, orderType, onPress, onAdd, onImageRef }: MenuRowProps) => {
    return (
      <View style={styles.itemRow}>
        <TouchableOpacity
          style={styles.itemPressable}
          activeOpacity={0.7}
          onPress={() => onPress(item)}>
          <View style={styles.imageWrapper}>
            <Image
              ref={(ref) => onImageRef(item.id, ref)}
              cachePolicy="disk"
              source={{ uri: item.image }}
              style={styles.itemImage}
              contentFit="cover"
              recyclingKey={item.image}
              transition={150}
            />
          </View>

          <View style={styles.itemInfo}>
            <DietBadge type={item.item_type} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>₹{getDisplayPrice(item, orderType)}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => onAdd(item)}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    );
  },
  (prev, next) => prev.item === next.item && prev.orderType === next.orderType,
);
MenuRow.displayName = 'MenuRow';

export default MenuRow;

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: t.spacing.lg,
  },
  itemPressable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.md,
  },
  imageWrapper: {
    width: 84,
    height: 84,
    borderRadius: t.radius.md,
    overflow: 'hidden',
    position: 'relative',
    marginLeft: 10,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    backgroundColor: t.colors.border,
  },
  itemInfo: {
    flex: 1,
    gap: t.spacing.xs,
  },
  itemName: {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.semibold,
    color: t.colors.text,
  },
  itemPrice: {
    fontSize: t.fontSize.sm,
    fontWeight: t.fontWeight.semibold,
    color: t.colors.text,
  },
  addButton: {
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.sm,
    marginLeft: t.spacing.sm,
    marginRight: t.spacing.sm,
    minWidth: 72,
    height: 36,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: t.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    // Per-row shadow/elevation forces an offscreen render pass on Android
    // for every mounted/recycled row during fast scroll. If you still see
    // jank on lower-end Android devices, drop the shadow* props and rely
    // on the borderWidth above instead.
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  addButtonText: {
    fontSize: t.fontSize.xs,
    fontWeight: t.fontWeight.bold,
    color: '#fff',
  },
});
