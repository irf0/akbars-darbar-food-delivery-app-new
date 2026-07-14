import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useAddressList } from '../hooks/useAddressList';
import { DarbarUserAddress } from 'src/global/services/addressService';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';

type NavProp = NativeStackNavigationProp<AppStackParamList>;

const AdressListScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { addresses, loading, refetch: fetchAddresses } = useAddressList();

  //this is currently set global address in the app
  const address = useOrderTypeStore((state) => state.address);
  const setDelivery = useOrderTypeStore((state) => state.setDelivery);

  //only re-render if change in addresses collection
  const sortByAddedDate = useMemo(() => {
    return [...(addresses || [])].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }, [addresses]);

  //set the selected address to global store
  const handleSelectAddress = (selected: DarbarUserAddress) => {
    setDelivery({
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>AdressesListScreen</Text>

        <Pressable onPress={() => navigation.navigate('AddressPicker')}>
          <Text>+Add New Address</Text>
        </Pressable>
      </View>
      <FlatList
        keyExtractor={(item) => item?.id}
        data={sortByAddedDate}
        refreshing={loading}
        onRefresh={fetchAddresses}
        renderItem={({ item }) => {
          const isSelected = address?.lat === item?.latitude && address?.lng === item?.longitude;

          return (
            <Pressable
              onPress={() => handleSelectAddress(item)}
              style={[styles.card, isSelected ? styles.selectedCard : styles.unselectedCard]}>
              <View style={styles.cardHeader}>
                <Text style={styles.label}>{item.label}</Text>
                {isSelected && <Text style={styles.badge}>Selected</Text>}
              </View>
              <Text style={styles.text}>{item.flatNum}</Text>
              <Text style={styles.text}>{item.street}</Text>
              {item.landmark && <Text style={styles.text}>{item.landmark}</Text>}
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default AdressListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  unselectedCard: {
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
  },
  selectedCard: {
    backgroundColor: '#e3f2fd', // Light blue tint
    borderColor: '#2196f3', // Vivid blue border
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#555',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#2196f3',
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
});
