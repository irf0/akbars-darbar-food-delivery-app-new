import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.82;
const DRAG_THRESHOLD = 80;

//Types

interface Customization {
  id: string;
  label: string;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  isVeg: boolean;
  rating?: number;
  calories?: number;
  customizations?: Customization[];
  isBestseller?: boolean;
}

interface MenuItemDetailCardProps {
  item: MenuItem;
  visible: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, selectedCustomizations: string[]) => void;
}

//Sub-components

const VegIcon = ({ isVeg }: { isVeg: boolean }) => (
  <View style={[styles.vegIcon, { borderColor: isVeg ? '#0f8a65' : '#e43b3b' }]}>
    <View style={[styles.vegDot, { backgroundColor: isVeg ? '#0f8a65' : '#e43b3b' }]} />
  </View>
);

//Main Component

const MenuItemDetailCard: React.FC<MenuItemDetailCardProps> = ({
  item,
  visible,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setQuantity(1);
      setSelected([]);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          damping: 22,
          stiffness: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: MODAL_HEIGHT,
          duration: 260,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => g.dy > 6,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) dragY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > DRAG_THRESHOLD) {
          Animated.timing(dragY, { toValue: 0, duration: 0, useNativeDriver: true }).start();
          onClose();
        } else {
          Animated.spring(dragY, { toValue: 0, damping: 20, useNativeDriver: true }).start();
        }
      },
    }),
  ).current;

  const toggleCustomization = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const totalPrice =
    item.price * quantity +
    (item.customizations ?? [])
      .filter((c) => selected.includes(c.id))
      .reduce((sum, c) => sum + c.price, 0);

  const handleAdd = () => {
    onAddToCart(item, quantity, selected);
    onClose();
  };

  const combinedTranslate = Animated.add(translateY, dragY);

  return (
    <Modal transparent visible={visible} onRequestClose={onClose} statusBarTranslucent>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <Pressable
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          onPress={onClose}
        />
      </Animated.View>

      {/* Sheet */}
      <Animated.View style={[styles.sheet, { transform: [{ translateY: combinedTranslate }] }]}>
        {/* Drag handle */}
        <View {...panResponder.panHandlers} style={styles.dragArea}>
          <View style={styles.handle} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollContent}>
          {/* Hero image */}
          {item.imageUrl ? (
            <Image source={{ uri: item.imageUrl }} style={styles.heroImage} resizeMode="cover" />
          ) : (
            <View style={styles.heroPlaceholder}>
              <Text style={styles.heroEmoji}>🍽️</Text>
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>
            {/* Header row */}
            <View style={styles.headerRow}>
              <VegIcon isVeg={item.isVeg} />
              {item.isBestseller && (
                <View style={styles.bestsellerBadge}>
                  <Text style={styles.bestsellerText}>★ Bestseller</Text>
                </View>
              )}
            </View>

            <Text style={styles.itemName}>{item.name}</Text>

            {/* Meta row */}
            <View style={styles.metaRow}>
              {item.rating !== undefined && (
                <View style={styles.ratingChip}>
                  <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                </View>
              )}
              {item.calories !== undefined && (
                <View style={styles.calChip}>
                  <Text style={styles.calText}>🔥 {item.calories} kcal</Text>
                </View>
              )}
            </View>

            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.divider} />

            {/* Customizations */}
            {item.customizations && item.customizations.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Add-ons</Text>
                <Text style={styles.sectionSubtitle}>Customise your order</Text>
                {item.customizations.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    style={styles.customRow}
                    activeOpacity={0.7}
                    onPress={() => toggleCustomization(c.id)}>
                    <View style={styles.customLeft}>
                      <VegIcon isVeg={item.isVeg} />
                      <Text style={styles.customLabel}>{c.label}</Text>
                    </View>
                    <View style={styles.customRight}>
                      <Text style={styles.customPrice}>+₹{c.price}</Text>
                      <View
                        style={[styles.checkbox, selected.includes(c.id) && styles.checkboxActive]}>
                        {selected.includes(c.id) && <Text style={styles.checkmark}>✓</Text>}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
                <View style={styles.divider} />
              </>
            )}

            {/* Spacer so CTA doesn't overlap content */}
            <View style={{ height: 100 }} />
          </View>
        </ScrollView>

        {/* Bottom CTA */}
        <View style={styles.ctaContainer}>
          <View style={styles.qtyControl}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => setQuantity((q) => q + 1)}>
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85} onPress={handleAdd}>
            <Text style={styles.addBtnText}>Add Item</Text>
            <View style={styles.addBtnPricePill}>
              <Text style={styles.addBtnPrice}>₹{totalPrice}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default MenuItemDetailCard;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: MODAL_HEIGHT,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 24,
  },
  dragArea: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d4d4d4',
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: 220,
  },
  heroPlaceholder: {
    width: SCREEN_WIDTH,
    height: 200,
    backgroundColor: '#fff5f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 72,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  vegIcon: {
    width: 18,
    height: 18,
    borderWidth: 1.8,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  bestsellerBadge: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  bestsellerText: {
    fontSize: 11,
    color: '#e65100',
    fontWeight: '600',
  },
  itemName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  ratingChip: {
    backgroundColor: '#f0faf5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 12,
    color: '#0f8a65',
    fontWeight: '600',
  },
  calChip: {
    backgroundColor: '#fff5f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  calText: {
    fontSize: 12,
    color: '#e43b3b',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 21,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 14,
  },
  customRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  customLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  customLabel: {
    fontSize: 14,
    color: '#333',
  },
  customRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  customPrice: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: '#fc8019',
    borderColor: '#fc8019',
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: 28,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 12,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fc8019',
    borderRadius: 10,
    overflow: 'hidden',
  },
  qtyBtn: {
    width: 36,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff7f2',
  },
  qtyBtnText: {
    fontSize: 20,
    color: '#fc8019',
    fontWeight: '600',
    lineHeight: 22,
  },
  qtyValue: {
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  addBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fc8019',
    borderRadius: 10,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 8,
    shadowColor: '#fc8019',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  addBtnPricePill: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  addBtnPrice: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
