import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOrdersStore } from '@features/orders/store/useOrdersStore';
import { theme } from '@theme';
import { AppStackParamList } from '@navigation/types';
import { usePastOrders } from '@features/orders/hooks/usePastOrders';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { useCartStore } from '@store/useCartStore';
import { OrderDoc } from '@types';
import { useMenuStore } from '@store/useMenuStore';
import { ReviewInputModal } from '../components/ReviewInputModal';
import BottomSheet from '@gorhom/bottom-sheet';
import { useUserReviews } from '../hooks/useUserReviews';
import { useReviewsStore } from '../store/useReviewsStore';
import { submitReview } from 'src/global/services/reviewService';
import { useToastStore } from '@store/useToastStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { haptics } from 'src/theme/haptics';

const formatRupees = (paise: number) => `₹${(paise / 100).toFixed(2)}`;

const statusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return '#2E7D32';
    case 'cancelled':
      return '#C62828';
    default:
      return theme.colors.primary;
  }
};

const OrderHistoryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const bottomSheetRef = useRef<BottomSheet | null>(null);
  const snapPoints = useMemo(() => ['42%', '20%'], []);

  const uid = useAuthStore((state) => state.user?.uid);
  usePastOrders(uid);
  useUserReviews(uid);

  const addItem = useCartStore((state) => state.addItem);
  const orders = useOrdersStore((state) => state.orders);
  const isLoading = useOrdersStore((state) => state.isLoading);
  const reviewedOrderIds = useReviewsStore((state) => state.reviewedOrderIds);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewInputText, setReviewInputText] = useState('');
  const [activeReviewOrderId, setActiveReviewOrderId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refresh } = usePastOrders(uid);
  const toast = useToastStore.getState();

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refresh();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleReorder = (order: OrderDoc) => {
    const menuItems = useMenuStore.getState().items;
    const unavailableItemNames: string[] = [];
    let addedAnyItem = false;

    for (const lineItem of order.lineItems) {
      const menuItem = menuItems.find((m) => m.id === lineItem.id);

      if (!menuItem || !menuItem.available) {
        unavailableItemNames.push(lineItem.name);
        continue;
      }

      addItem(menuItem, lineItem.portion, lineItem.quantity);
      addedAnyItem = true;
      toast.show({ message: 'Added to cart', type: 'success' });
    }

    if (addedAnyItem) {
      navigation.navigate('Cart');
    }

    if (unavailableItemNames.length > 0) {
      Alert.alert(
        'Some items unavailable',
        `${unavailableItemNames.join(', ')} could no longer be added.`,
      );
    }
  };

  const openReviewSheet = (orderId: string) => {
    haptics.select();
    setActiveReviewOrderId(orderId);
    setReviewInputText('');
    setReviewRating(0);
    bottomSheetRef.current?.expand();
  };

  const handleReviewSubmit = async () => {
    if (!activeReviewOrderId || !uid) return;

    try {
      await submitReview(activeReviewOrderId, uid, reviewRating, reviewInputText);
      bottomSheetRef.current?.close();
    } catch (error) {
      console.error('Failed to submit review:', error);
      Alert.alert('Something went wrong', 'Could not submit your review. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text>{'Loading...'}</Text>
      </View>
    );
  }
  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🍽️</Text>

        <Text style={styles.emptyTitle}>No orders yet</Text>

        <Text style={styles.emptySubtitle}>
          {" Your completed orders will appear here once you've enjoyed your first meal with us."}
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.exploreButton}
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}>
          <Text style={styles.exploreButtonText}>Explore Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.refreshButton}
          onPress={handleManualRefresh}
          disabled={isRefreshing}>
          <Text style={styles.refreshButtonText}>{isRefreshing ? 'Refreshing...' : 'Refresh'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const alreadyReviewed = reviewedOrderIds.has(item.id);
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.card}
              onPress={() => navigation.navigate('OrderConfirmation', { orderId: item.id })}>
              <View style={styles.row}>
                <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                <Text style={[styles.status, { color: statusColor(item.orderStatus) }]}>
                  {item.orderStatus.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.itemsSummary} numberOfLines={2}>
                {item.lineItems.map((li) => `${li.name} ×${li.quantity}`).join(', ')}
              </Text>

              <View style={styles.row}>
                <Text style={styles.date}>
                  {item.createdAt?.toDate().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>

                <Text style={styles.total}>{formatRupees(item.bill.total)}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.actions}>
                <Pressable
                  style={[styles.reviewButton, alreadyReviewed && styles.reviewButtonDisabled]}
                  disabled={alreadyReviewed}
                  onPress={() => openReviewSheet(item.id)}>
                  <Text style={[styles.reviewText, alreadyReviewed && styles.reviewTextDisabled]}>
                    {alreadyReviewed ? 'Already Submitted' : 'Write a Review'}
                  </Text>
                </Pressable>

                <Pressable style={styles.reorderButton} onPress={() => handleReorder(item)}>
                  <Text style={styles.reorderText}>↻ Order Again</Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <ReviewInputModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        value={reviewInputText}
        onChange={setReviewInputText}
        rating={reviewRating}
        onRatingChange={setReviewRating}
        onSubmit={handleReviewSubmit}
      />
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: 22,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },

  emptySubtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 24,
    color: '#7B7B7B',
    textAlign: 'center',
    maxWidth: 320,
  },

  exploreButton: {
    marginTop: 34,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 34,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  exploreButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },

  refreshButton: {
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  refreshButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },

  container: { flex: 1, backgroundColor: theme.colors.background },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF9F6',
  },

  emptyText: {
    color: '#777',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },

  list: {
    padding: 16,
    paddingBottom: 28,
    backgroundColor: theme.colors.background,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },

  status: {
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    overflow: 'hidden',
    letterSpacing: 0.5,
  },

  itemsSummary: {
    marginTop: 10,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },

  date: {
    marginTop: 14,
    fontSize: 12,
    color: '#8B8B8B',
  },

  total: {
    marginTop: 14,
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.primary,
  },

  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginTop: 16,
    marginBottom: 16,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 8,
  },

  reviewButton: {
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  reviewText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },

  reorderButton: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  reorderText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  reviewButtonDisabled: {
    borderColor: '#D0D0D0',
    backgroundColor: '#F5F5F5',
  },
  reviewTextDisabled: {
    color: '#A0A0A0',
  },
});
