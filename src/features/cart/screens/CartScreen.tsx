import { FlatList, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Image } from 'expo-image';
import { getPriceForPortion } from '@utils/getPriceForPortion';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { Ionicons } from '@expo/vector-icons';

import CustomDeleteModal from 'src/global/components/CustomDeleteModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackParamList, BottomTabsParamList } from '@navigation/types';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ClearCartModal from 'src/global/components/ClearCartModal';
import { useCartStore } from '@store/useCartStore';
import QuantityStepper from 'src/global/components/QuantityStepper';
import { useCartTotal } from '@hooks/useCartTotal';
import { PortionType } from '@types';
import CouponPicker from '../components/CouponPicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCoupons } from '../hooks/useCoupons';
import { useCouponStore } from '../store/useCouponStore';
import { calculateCouponDiscount } from '@utils/calculateCouponDiscount';
type Props = CompositeScreenProps<
  NativeStackScreenProps<AppStackParamList, 'Cart'>,
  BottomTabScreenProps<BottomTabsParamList>
>;

const CartScreen = ({ navigation }: Props) => {
  const orderType = useOrderTypeStore((state) => state.orderType) as 'delivery' | 'takeaway';
  const { items, incrementItem, decrementItem, removeItem, clearCart } = useCartStore();
  const [activeItem, setActiveItem] = useState<{
    id: string;
    portion: PortionType;
    name: string;
  } | null>(null);
  const [clearCartModalVisible, setClearCartModalVisible] = useState<boolean>(false);
  const cartTotal = useCartTotal();

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { coupons } = useCoupons();

  const applyCoupon = useCouponStore((state) => state.applyCoupon);
  const appliedCoupon = useCouponStore((state) => state.appliedCoupon);

  const couponDiscount = calculateCouponDiscount(cartTotal, appliedCoupon);

  const payableAmount = cartTotal - couponDiscount;

  const handleCheckoutPress = () => {
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.headerText}>Your Cart</Text>
      {items.length < 1 ? (
        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: '50%' }}>
          <Text>{"Uh! Oh. You don't have anything in the Cart yet."}</Text>
          <TouchableOpacity
            style={{ backgroundColor: 'red', padding: 15 }}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Menu', params: {} })}>
            <Text style={{ textAlign: 'center' }}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.screenContainer}>
          <Pressable onPress={() => setClearCartModalVisible(true)}>
            <Text style={{ alignSelf: 'flex-end' }}>Clear Cart</Text>
          </Pressable>
          <FlatList
            style={{ flex: 1 }}
            data={items}
            keyExtractor={(item) => `${item.id}-${item.portion}`}
            renderItem={({ item }) => (
              <View style={styles.cartRow}>
                <View style={styles.leftContent}>
                  <Image
                    cachePolicy={'memory-disk'}
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    contentFit="cover"
                    transition={200}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.itemNameText} numberOfLines={2}>
                      {item.name} ({item.portion})
                    </Text>
                    <Text style={styles.priceText}>
                      price: ₹{item.quantity * getPriceForPortion(item, orderType)}
                    </Text>
                  </View>
                </View>

                <View style={styles.rightContent}>
                  <QuantityStepper
                    quantity={item.quantity}
                    onIncrement={() => incrementItem(item.id, item.portion)}
                    onDecrement={() => decrementItem(item.id, item.portion)}
                  />

                  <Pressable
                    onPress={() =>
                      setActiveItem({ id: item.id, portion: item.portion, name: item.name })
                    }
                    style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
                    hitSlop={12}>
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </Pressable>
                </View>
              </View>
            )}
          />

          <ClearCartModal
            visible={clearCartModalVisible}
            onCancel={() => setClearCartModalVisible(false)}
            onConfirm={() => {
              clearCart();
              setClearCartModalVisible(false);
            }}
          />

          <CustomDeleteModal
            visible={activeItem !== null}
            itemName={activeItem?.name || ''}
            onCancel={() => setActiveItem(null)}
            onConfirm={() => {
              if (activeItem) {
                removeItem(activeItem.id, activeItem.portion);
                setActiveItem(null);
              }
            }}
          />

          <CouponPicker
            bottomSheetRef={bottomSheetRef}
            coupons={coupons}
            subtotal={cartTotal}
            onApply={(coupon) => {
              applyCoupon(coupon);
              bottomSheetRef.current?.dismiss();
            }}
          />
          <Pressable
            onPress={() => bottomSheetRef.current?.present()}
            style={{
              marginHorizontal: 16,
              marginVertical: 12,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Offers & Coupons</Text>

              {appliedCoupon ? (
                <Text style={{ color: 'green', marginTop: 4 }}>✓ {appliedCoupon.code} applied</Text>
              ) : (
                <Text style={{ color: '#666', marginTop: 4 }}>
                  {coupons.length} offers available
                </Text>
              )}
            </View>

            <Ionicons name="chevron-forward" size={22} color="#999" />
          </Pressable>

          <View style={{ paddingHorizontal: 16, gap: 6 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>Subtotal</Text>

              <Text>₹{cartTotal.toFixed(1)}</Text>
            </View>

            {appliedCoupon && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>Coupon ({appliedCoupon.code})</Text>

                <Text style={{ color: 'green' }}>-₹{couponDiscount.toFixed(1)}</Text>
              </View>
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                Total
              </Text>

              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                ₹{payableAmount.toFixed(1)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleCheckoutPress()}
            activeOpacity={0.7}
            style={{ backgroundColor: 'green', padding: 20 }}>
            <Text style={{ textAlign: 'center' }}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
  cartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  itemNameText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
  },
  priceText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#4b5563',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  deleteButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  itemImage: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
});
