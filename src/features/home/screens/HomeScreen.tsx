import React, { useEffect, useRef } from 'react'
import {
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '@features/auth/store/useAuthStore'
import { useMenu } from '@hooks/useMenu'
import { useAdminSettings } from '@hooks/useAdminSettings'
import { useCartStore } from '@store/cart/useCartStore'
import { theme } from '@theme'
import HeroBanner from '../components/HeroBanner'
import { CategoryList } from '../components/CategoryList'
import { AppStackParamList, BottomTabsParamList } from '@navigation/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { createStyles } from './styles'
import { HomeHeader } from '../components/HomeHeader'
import useMenuCategories from '@hooks/useMenuCategories'
import { useOrderTypeStore } from '@store/orderType/useOrderTypeStore'
import BestSellerList from '../components/BestSellerList'


type Props = NativeStackScreenProps<AppStackParamList, 'MainTabs'>

export default function HomeScreen({ navigation }: Props) {
    const tabNavigation = useNavigation<BottomTabNavigationProp<BottomTabsParamList>>()
    const styles = createStyles
    const { categories } = useMenuCategories()
    const { user } = useAuthStore()
    const { settings } = useAdminSettings()
    const { menu, loading } = useMenu()
    const bestSellers = Object.values(menu).flat().filter(i => i.bestSeller && i.available)
    const totalItems = useCartStore(s => s.totalItems())

    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(20)).current


    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1, duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0, duration: 500,
                useNativeDriver: true,
            }),
        ]).start()
    }, [])

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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* ── Search Bar ── */}
                <TouchableOpacity
                    style={styles.searchBar}
                    onPress={() => navigation.navigate('Search')}
                    activeOpacity={0.7}
                >
                    <Ionicons name="search-outline" size={18} color={theme.colors.textSecondary} />
                    <Text style={styles.searchPlaceholder}>
                        Search biryani, starters...
                    </Text>
                </TouchableOpacity>

                {/* Hero Banner */}
                <HeroBanner onPress={() => navigation.navigate('FullMenu')} />

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
                <BestSellerList
                    onItemPress={(item) => navigation.navigate('MenuDetails', { item: item })}
                />
            </ScrollView>
        </SafeAreaView>
    )
}




