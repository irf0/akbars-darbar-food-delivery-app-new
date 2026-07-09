import { FlatList, StyleSheet, Text, View, Pressable, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
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
import { AddressItem, AddressSelectModal } from 'src/global/components/AddressSelectModal';
import { useUserAddress } from '../hooks/useUserAddress';
import { useCartStore } from '@store/useCartStore';
import QuantityStepper from 'src/global/components/QuantityStepper';
import { useCartTotal } from '@hooks/useCartTotal';
import { PortionType } from '@types';
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
  const { addresses, defaultAddressId } = useUserAddress();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressItem | null>(null);

  const handleCheckoutPress = () => {
    if (orderType === 'delivery') {
      setIsAddressModalOpen(true);
    } else {
      Alert.alert('Takeaway', 'Time picker modal will go here next!');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.headerText}>Your Cart</Text>
      {items.length < 1 ? (
        <View style={{ justifyContent: 'center', alignSelf: 'center', marginTop: '50%' }}>
          <Text>Uh! Oh You don't have anything in the Cart yet.</Text>
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
                      price: {item.quantity * getPriceForPortion(item, orderType)}
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
          {selectedAddress && (
            <Text style={{ marginBottom: 20, textAlign: 'center' }}>
              Delivering to: {selectedAddress.label} — {selectedAddress.addressLine}
            </Text>
          )}

          <AddressSelectModal
            isVisible={isAddressModalOpen}
            onClose={() => setIsAddressModalOpen(false)}
            addresses={addresses}
            defaultAddressId={defaultAddressId}
            onAddNewAddress={() => {
              setIsAddressModalOpen(false);
              // navigate to add-address screen
            }}
            onAddressConfirm={(address) => {
              setSelectedAddress(address);
              setIsAddressModalOpen(false);
            }}
          />

          <ClearCartModal
            visible={clearCartModalVisible}
            onCancel={() => setClearCartModalVisible(false)}
            onConfirm={() => {
              clearCart();
              setClearCartModalVisible(true);
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

          <Text>Total Price: {cartTotal}</Text>
          <TouchableOpacity
            onPress={() => handleCheckoutPress()}
            activeOpacity={0.7}
            style={{ backgroundColor: 'green', padding: 20 }}>
            <Text style={{ textAlign: 'center' }}>Select Address</Text>
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
