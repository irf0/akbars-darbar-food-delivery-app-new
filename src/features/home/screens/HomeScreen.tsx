import React, { useEffect, useState } from 'react';
import { ScrollView, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import HeroBanner from '../components/HeroBanner';
import { CategoryList } from '../components/CategoryList';
import { createStyles } from './styles';
import { HomeHeader } from '../components/HomeHeader';
import useMenuCategories from '@hooks/useMenuCategories';
import BestSellerList from '../components/BestSellerList';
import { AppStackParamList, BottomTabsParamList } from '@navigation/types';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAdminSettingsStore } from '@store/useAdminSettingsStore';
import { OrderTypeBar } from '../components/OrderTypeBar';
import { LiveOrderBanner } from '../components/LiveOrderBanner';
import { OrderDoc } from '@types';
import firestore from '@react-native-firebase/firestore';
import { HomeSearchBar } from '../components/HomeSearchBar';

// Temporary while building the UI
const SHOW_MOCK_ORDER = false;

const mockOrder: OrderDoc & { id: string } = {
  id: 'mock-order-1',

  uid: 'user-123',

  orderType: 'delivery',

  addressId: 'address-1',

  lineItems: [
    {
      id: 'item-1',
      name: 'Chicken Dum Biryani',
      portion: 'full',
      quantity: 2,
      unitPrice: 26000,
      lineTotal: 52000,
    },
    {
      id: 'item-2',
      name: 'Chicken Tikka',
      portion: 'half',
      quantity: 1,
      unitPrice: 18000,
      lineTotal: 18000,
    },
  ],

  bill: {
    itemsSubtotal: 70000,
    deliveryCharge: 3000,
    packingCharge: 1000,
    platformFee: 500,
    discount: 5000,
    total: 69500,
    cgstAmount: 1750,
    sgstAmount: 1750,
    appliedCoupon: {
      code: 'WELCOME50',
      type: 'flat',
      value: 5000,
    },
  },

  cookingInstructions: 'Less spicy',

  deliveryInstructions: 'Leave at the gate',

  takeawaySlot: null,

  currency: 'INR',

  razorpayOrderId: 'order_mock',

  razorpayPaymentId: 'pay_mock',

  paymentStatus: 'paid',

  orderStatus: 'completed',

  orderNumber: '1043',

  deliveryOtp: '4821',

  createdAt: firestore.Timestamp.now(),
};

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Home'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const styles = createStyles;
  const { categories } = useMenuCategories();
  const { user } = useAuthStore();
  const { settings } = useAdminSettingsStore();

  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(20));

  // console.log(user)
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView style={createStyles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ── */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <HomeHeader user={user} settings={settings} />
      </Animated.View>

      <OrderTypeBar />

      {/* {activeOrder && (
        <LiveOrderBanner
          order={activeOrder}
          onPress={() => navigation.navigate('OrderTracking', { orderId: activeOrder.id })}
        />
      )} */}

      {/* ── Search Bar ── */}

      <HomeSearchBar />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {SHOW_MOCK_ORDER && <LiveOrderBanner order={mockOrder} onPress={() => ''} />}

        {/* Hero Banner */}
        <HeroBanner
          onPress={() => navigation.navigate('MainTabs', { screen: 'Menu', params: {} })}
        />

        {/* Categories */}
        <CategoryList
          categories={categories}
          onCategoryPress={(item) =>
            navigation.navigate('MainTabs', {
              screen: 'Menu',
              params: { category: item },
            })
          }
        />

        {/* Best-Sellers */}
        <BestSellerList onItemPress={(item) => navigation.navigate('MenuDetail', { item: item })} />
      </ScrollView>
    </SafeAreaView>
  );
}
