import React from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { theme } from '@theme';

interface FormProps {
  bottomSheetRef: React.ForwardedRef<BottomSheet> | React.RefObject<BottomSheet>;
  snapPoints: string[];
  street: string;
  addressInfoMessage: string | null;
  flatNum: string;
  setFlatNum: (text: string) => void;
  landmark: string;
  setLandMark: (text: string) => void;
  onConfirm: () => void;
}

export const AddressPickerForm = ({
  bottomSheetRef,
  snapPoints,
  street,
  addressInfoMessage,
  flatNum,
  setFlatNum,
  landmark,
  setLandMark,
  onConfirm,
}: FormProps) => {
  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0}>
      <BottomSheetView style={styles.sheetContainer}>
        <Text style={styles.addressHeadline}>
          {street || addressInfoMessage || 'Move the map to set your location'}
        </Text>

        <BottomSheetTextInput
          placeholder="Flat / House No., Floor (required)"
          placeholderTextColor="#888"
          value={flatNum}
          onChangeText={setFlatNum}
          style={styles.input}
        />

        <BottomSheetTextInput
          placeholder="Landmark (optional)"
          placeholderTextColor="#888"
          value={landmark}
          onChangeText={setLandMark}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.confirmButton, !flatNum && styles.disabledButton]}
          disabled={!flatNum}
          onPress={onConfirm}
          activeOpacity={0.8}>
          <Text style={styles.confirmText}>Confirm Address</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    padding: 16,
    gap: 12,
  },
  addressHeadline: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15,
    marginBottom: 4,
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
