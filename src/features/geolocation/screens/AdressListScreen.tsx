import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { theme } from '@theme';
import { useAddressList } from '../hooks/useAddressList';
import { DarbarUserAddress } from 'src/global/services/addressService';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';

type NavProp = NativeStackNavigationProp<AppStackParamList>;

const AddressListScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { addresses, loading } = useAddressList();

  const address = useOrderTypeStore((state) => state.address);
  const setDelivery = useOrderTypeStore((state) => state.setDelivery);

  const sortByAddedDate = useMemo(() => {
    return [...(addresses || [])].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }, [addresses]);

  const handleSelectAddress = (selected: DarbarUserAddress) => {
    setDelivery({
      id: selected.id,
      lat: selected.latitude,
      lng: selected.longitude,
      formattedAddress: [selected.flatNum, selected.street, selected.landmark]
        .filter(Boolean)
        .join(', '),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={8}
            style={({ pressed }) => [styles.closeButton, pressed && styles.addButtonPressed]}>
            <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>Saved Addresses</Text>
            <Text style={styles.headerSubtitle}>Tap an address to deliver there</Text>
          </View>
        </View>

        <Pressable
          onPress={() => navigation.navigate('AddressPicker')}
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
          android_ripple={{ color: theme.colors.primaryLight }}>
          <Feather name="plus" size={16} color={theme.colors.primary} />
          <Text style={styles.addButtonText}>Add New</Text>
        </Pressable>
      </View>

      <FlatList
        keyExtractor={(item, index) => item?.id ?? `address-${index}`}
        data={sortByAddedDate}
        refreshing={loading}
        contentContainerStyle={sortByAddedDate.length === 0 && styles.emptyListContent}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={theme.colors.primary} style={styles.emptyLoader} />
          ) : (
            <View style={styles.emptyState}>
              <Feather name="map-pin" size={32} color={theme.colors.textDisabled} />
              <Text style={styles.emptyTitle}>No saved addresses yet</Text>
              <Text style={styles.emptySubtitle}>
                Add an address to speed up checkout next time.
              </Text>
              <Pressable
                onPress={() => navigation.navigate('AddressPicker')}
                style={({ pressed }) => [styles.emptyCta, pressed && styles.addButtonPressed]}>
                <Text style={styles.emptyCtaText}>Add Address</Text>
              </Pressable>
            </View>
          )
        }
        renderItem={({ item }) => {
          const isSelected = address?.lat === item?.latitude && address?.lng === item?.longitude;

          return (
            <Pressable
              onPress={() => handleSelectAddress(item)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              android_ripple={{ color: theme.colors.surfaceAlt }}>
              <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={styles.label}>{item.label}</Text>
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  {item.flatNum}
                </Text>
                <Text style={styles.text} numberOfLines={1}>
                  {item.street}
                </Text>
                {item.landmark ? (
                  <Text style={styles.text} numberOfLines={1}>
                    {item.landmark}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default AddressListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexShrink: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: '#fff',
    ...theme.shadow.sm,
  },
  cardPressed: {
    backgroundColor: theme.colors.surfaceAlt,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: theme.radius.full,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioOuterActive: {
    borderColor: theme.colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.primary,
  },
  cardBody: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontWeight: '700',
    fontSize: 15,
    color: theme.colors.text,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 1,
  },
  badge: {
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.primary,
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
  },
  emptyListContent: {
    flexGrow: 1,
  },
  emptyLoader: {
    marginTop: theme.spacing.xxl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    gap: 4,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  emptyCta: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  emptyCtaText: {
    color: theme.colors.textInverse,
    fontWeight: '700',
    fontSize: 14,
  },
});
