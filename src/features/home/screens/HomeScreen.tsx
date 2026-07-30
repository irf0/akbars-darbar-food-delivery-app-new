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
import { HomeSearchBar } from '../components/HomeSearchBar';
import { useActiveOrderListener } from '@hooks/useActiveOrderListener';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Home'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const styles = createStyles;
  const { categories } = useMenuCategories();
  const { user } = useAuthStore();
  const { settings } = useAdminSettingsStore();
  const { activeOrder } = useActiveOrderListener();

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

      <HomeHeader user={user} settings={settings} />

      <OrderTypeBar />

      {/* ── Search Bar ── */}

      <HomeSearchBar />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeOrder && (
          <LiveOrderBanner
            order={activeOrder}
            onPressCard={() =>
              navigation.navigate('OrderConfirmation', { orderId: activeOrder.id, live: true })
            }
            onPressBtn={() => navigation.navigate('LiveOrderTracking', { orderId: activeOrder.id })}
          />
        )}
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
