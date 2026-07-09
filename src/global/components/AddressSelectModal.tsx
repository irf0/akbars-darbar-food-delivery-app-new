import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export interface AddressItem {
  id: string;
  label: string;
  addressLine: string;
}

interface AddressSelectModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddressConfirm: (address: AddressItem) => void;
  onAddNewAddress: () => void;
  addresses: AddressItem[];
  defaultAddressId?: string | null;
}

export const AddressSelectModal: React.FC<AddressSelectModalProps> = ({
  isVisible,
  onClose,
  onAddressConfirm,
  onAddNewAddress,
  addresses, //coming from CartScreen
  defaultAddressId = null,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(defaultAddressId);

  // Reset selection to the default address whenever the modal opens
  useEffect(() => {
    if (isVisible) {
      setSelectedId(defaultAddressId);
    }
  }, [isVisible, defaultAddressId]);

  const handleConfirmPress = () => {
    const chosenAddress = addresses.find((item) => item.id === selectedId);
    if (chosenAddress) {
      onAddressConfirm(chosenAddress);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Address</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Address List */}
          {addresses.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>You don't have any saved addresses yet.</Text>
            </View>
          ) : (
            <FlatList
              data={addresses}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedId === item.id;
                console.log(item);
                return (
                  <TouchableOpacity
                    style={[styles.card, isSelected && styles.selectedCard]}
                    onPress={() => setSelectedId(item.id)}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.addressLine}>{item.addressLine}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          <View style={styles.footer}>
            <TouchableOpacity style={styles.addButton} onPress={onAddNewAddress}>
              <Text style={styles.addButtonText}>+ Add New Address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, !selectedId && styles.disabledButton]}
              disabled={!selectedId}
              onPress={handleConfirmPress}>
              <Text style={styles.buttonText}>Confirm Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#f2f3ee',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 18,
    color: '#999',
  },
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  selectedCard: {
    borderColor: '#00cc44',
    backgroundColor: '#f0fff5',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  addressLine: {
    color: '#666',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
  },
  addButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    color: '#00cc44',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00cc44',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
