import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOrdersStore } from '@features/orders/store/useOrdersStore';
import { theme } from '@theme';
import { AppStackParamList } from '@navigation/types';
import { usePastOrders } from '@features/orders/hooks/usePastOrders';
import { useAuthStore } from '@features/auth/store/useAuthStore';

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

  const uid = useAuthStore((state) => state.user?.uid);
  usePastOrders(uid);

  const user = useAuthStore((state) => state.user);
  console.log('OrderHistoryScreen full user:', JSON.stringify(user));

  const orders = useOrdersStore((state) => state.orders);
  const isLoading = useOrdersStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No orders yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('OrderConfirmation', { orderId: item.id })}>
          <View style={styles.row}>
            <Text style={styles.orderNumber}>{item.orderNumber}</Text>
            <Text style={[styles.status, { color: statusColor(item.orderStatus) }]}>
              {item.orderStatus.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.itemsSummary}>
            {item.lineItems.map((li) => `${li.name} x${li.quantity}`).join(', ')}
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
        </TouchableOpacity>
      )}
    />
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#666', fontSize: 15 },
  list: { padding: 16 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderNumber: { fontSize: 16, fontWeight: '700', color: '#111' },
  status: { fontSize: 12, fontWeight: '700' },
  itemsSummary: { marginTop: 8, color: '#555', fontSize: 13 },
  date: { marginTop: 10, color: '#888', fontSize: 12 },
  total: { marginTop: 10, fontWeight: '700', color: '#111', fontSize: 14 },
});
