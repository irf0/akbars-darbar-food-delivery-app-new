import { FlatList, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import React, { Fragment, useRef, useState } from 'react';
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
import { CartItem, PortionType } from '@types';
import CouponPicker from '../components/CouponPicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCoupons } from '../hooks/useCoupons';
import { useCouponStore } from '../store/useCouponStore';
import { calculateCouponDiscount } from '@utils/calculateCouponDiscount';
import { theme } from '@theme';
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

  const isDeliveryDisabled = orderType === 'delivery' && cartTotal < 200;

  const handleCheckoutPress = () => {
    navigation.navigate('Checkout');
  };

  const getPortionLabel = (item: CartItem) => {
    if (item.portion === 'half') return item.halfPortion || 'Half';
    if (item.portion === 'full') return item.fullPortion || 'Full';
    return '';
  };

  // console.log(items);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Your Cart</Text>

        {items.length > 0 && (
          <Pressable onPress={() => setClearCartModalVisible(true)}>
            <Text style={styles.clearCartText}>Clear Cart</Text>
          </Pressable>
        )}
      </View>

      {items.length < 1 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{"Uh! Oh. You don't have anything in the Cart yet."}</Text>

          <TouchableOpacity
            style={styles.cta}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('MainTabs', {
                screen: 'Menu',
                params: {},
              })
            }>
            <Text style={styles.ctaText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.screenContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            data={[{ key: 'cart' }]}
            keyExtractor={(item) => item.key}
            renderItem={() => (
              <>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>
                      Cart ({items.length} {items.length === 1 ? 'Item' : 'Items'})
                    </Text>
                  </View>

                  {items.map((item, index) => (
                    <Fragment key={`${item.id}-${item.portion}`}>
                      <View style={styles.cartRow}>
                        <Image
                          cachePolicy="memory-disk"
                          source={{ uri: item.image }}
                          style={styles.itemImage}
                          contentFit="cover"
                          transition={200}
                        />

                        <View style={styles.textContainer}>
                          <Text style={styles.itemNameText} numberOfLines={2}>
                            {item.name}
                          </Text>
                          <Text style={styles.portionText}>{getPortionLabel(item)}</Text>

                          <View style={styles.bottomRow}>
                            <Text style={styles.priceText}>
                              ₹{item.quantity * getPriceForPortion(item, orderType)}
                            </Text>

                            <View style={styles.stepperWrapper}>
                              <QuantityStepper
                                quantity={item.quantity}
                                onIncrement={() => incrementItem(item.id, item.portion)}
                                onDecrement={() => {
                                  if (item.quantity === 1) {
                                    setActiveItem({
                                      id: item.id,
                                      portion: item.portion,
                                      name: item.name,
                                    });
                                  } else {
                                    decrementItem(item.id, item.portion);
                                  }
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      </View>

                      {index !== items.length - 1 && <View style={styles.divider} />}
                    </Fragment>
                  ))}
                </View>

                <Pressable style={styles.card} onPress={() => bottomSheetRef.current?.present()}>
                  <View style={styles.couponRow}>
                    <View>
                      <Text style={styles.cardTitle}>Offers & Coupons</Text>

                      {appliedCoupon ? (
                        <Text style={styles.appliedCoupon}>✓ {appliedCoupon.code} applied</Text>
                      ) : (
                        <Text style={styles.couponSubtitle}>{coupons.length} offers available</Text>
                      )}
                    </View>

                    <Ionicons name="chevron-forward" size={22} color="#999" />
                  </View>
                </Pressable>

                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Cart Summary</Text>

                  <View style={styles.billRow}>
                    <Text style={styles.billLabel}>Subtotal</Text>
                    <Text style={styles.billValue}>₹{cartTotal.toFixed(1)}</Text>
                  </View>

                  {appliedCoupon && (
                    <View style={styles.billRow}>
                      <Text style={styles.billLabel}>Coupon ({appliedCoupon.code})</Text>

                      <Text style={styles.discountText}>-₹{couponDiscount.toFixed(1)}</Text>
                    </View>
                  )}

                  <View style={styles.divider} />

                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>

                    <Text style={styles.totalAmount}>₹{payableAmount.toFixed(1)}</Text>
                  </View>
                </View>
              </>
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

          <TouchableOpacity
            // disabled={isDeliveryDisabled}
            style={[styles.cta, isDeliveryDisabled && styles.disabledBtn]}
            activeOpacity={0.8}
            onPress={handleCheckoutPress}>
            <Text style={styles.ctaText}>
              {isDeliveryDisabled ? `Minimum Order Value ₹200` : 'Proceed to Checkout'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  warningText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: '#FFEBEE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  disabledBtn: {
    opacity: 0.7,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  content: {
    paddingBottom: 120,
    paddingTop: 4,
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },

  clearCartText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E53935',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 16,
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

  cardHeader: {
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },

  rightContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
    gap: 14,
  },

  deleteButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#FDECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pressed: {
    opacity: 0.7,
  },

  couponRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  couponSubtitle: {
    marginTop: 4,
    fontSize: 15,
    color: '#666',
  },

  appliedCoupon: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.primary,
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  billLabel: {
    fontSize: 15,
    color: '#444',
  },

  billValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  discountText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.primary,
  },

  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 12,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  cta: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,

    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  ctaText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    flexWrap: 'wrap',
  },

  cartRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },

  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#EEE',
  },

  textContainer: {
    flex: 1,
    marginLeft: 14,
  },

  itemNameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    lineHeight: 20,
  },

  portionText: {
    marginTop: 2,
    fontSize: 13,
    color: '#888',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  priceText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  stepperWrapper: {
    transform: [{ scale: 0.8 }],
    marginRight: -8,
  },
});
