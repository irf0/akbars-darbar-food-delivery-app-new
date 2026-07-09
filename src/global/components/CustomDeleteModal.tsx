import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface CustomDeleteModalProps {
  visible: boolean;
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const CustomDeleteModal = ({ visible, itemName, onCancel, onConfirm }: CustomDeleteModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <View style={styles.alertCard}>
          <Text style={styles.titleText}>Remove Item</Text>
          <Text style={styles.messageText}>
            Are you sure you want to remove <Text style={styles.boldText}>{itemName}</Text> from
            your cart?
          </Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
              onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [styles.confirmButton, pressed && styles.pressed]}
              onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Remove</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CustomDeleteModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Dimmed dark overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  alertCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    // Shadow for premium card depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  boldText: {
    fontWeight: '600',
    color: '#111827',
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6', // Light slate tone
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 15,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ef4444', // Premium alert red
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
