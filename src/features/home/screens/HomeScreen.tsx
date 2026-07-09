import React, { useEffect, useRef } from 'react';
import { Text, ScrollView, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { useAdminSettings } from '@hooks/useAdminSettings';
import { theme } from 'src/theme';
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
import { useCartStore } from '@store/useCartStore';
import { useAdminSettingsStore } from '@store/useAdminSettingsStore';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Home'>,
  NativeStackScreenProps<AppStackParamList>
>;

export default function HomeScreen({ navigation }: Props) {
  const styles = createStyles;
  const { categories } = useMenuCategories();
  const { user } = useAuthStore();
  const { settings } = useAdminSettingsStore();
  const totalItems = useCartStore((s) => s.totalItems());

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

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
  }, []);

  return (
    <SafeAreaView style={createStyles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* ── Header ── */}
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <HomeHeader
          user={user}
          settings={settings}
          totalItems={totalItems}
          onCartPress={() => navigation.navigate('Cart')}
        />
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* ── Search Bar ── */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('Search')}
          activeOpacity={0.7}>
          <Ionicons name="search-outline" size={18} color={theme.colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search biryani, starters...</Text>
        </TouchableOpacity>

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
