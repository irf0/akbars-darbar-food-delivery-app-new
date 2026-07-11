import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { theme } from '@theme';

interface FormProps {
  bottomSheetRef: React.ForwardedRef<BottomSheet> | React.RefObject<BottomSheet>;
  snapPoints: string[];
  street: string;
  addressInfoMessage: string | null;
  flatNum: string;
  landmark: string;
  label: string | undefined;
  setLabel: (text: string) => void;
  setStreet: (text: string) => void;
  setFlatNum: (text: string) => void;
  setLandMark: (text: string) => void;
  onConfirm: (label: string) => void;
}

export const AddressPickerForm = ({
  bottomSheetRef,
  snapPoints,
  street,
  addressInfoMessage,
  flatNum,
  landmark,
  label,
  setLabel,
  setStreet,
  setFlatNum,
  setLandMark,
  onConfirm,
}: FormProps) => {
  // const [addressLabel, setAddressLabel] = useState<string>('Home');

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0}>
      <BottomSheetView style={styles.sheetContainer}>
        <Text style={styles.addressHeadline}>
          {street || addressInfoMessage || 'Move the map to set your location'}
        </Text>
        {addressInfoMessage && (
          <BottomSheetTextInput
            placeholder="Street / Area name (Required)"
            placeholderTextColor="#757575"
            value={street}
            onChangeText={setStreet}
            style={styles.input}
          />
        )}

        <BottomSheetTextInput
          placeholder="Flat / House No., Building, Floor (Required)"
          placeholderTextColor="#757575"
          value={flatNum}
          onChangeText={setFlatNum}
          style={styles.input}
        />

        <BottomSheetTextInput
          placeholder="Nearby Landmark (Optional)"
          placeholderTextColor="#757575"
          value={landmark}
          onChangeText={setLandMark}
          style={styles.input}
        />

        {/* FIXED: Single layout wrapper structure */}
        <View style={styles.chipSectionContainer}>
          <Text style={styles.sectionTitle}>Save as:</Text>
          <View style={styles.chipRow}>
            {['Home', 'Work', 'Other'].map((currentLabel) => {
              const isActive = currentLabel === label;
              return (
                <TouchableOpacity
                  key={currentLabel}
                  activeOpacity={0.7}
                  onPress={() => setLabel(currentLabel)}
                  style={[styles.chip, isActive && styles.activeChip]}>
                  <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                    {currentLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, !flatNum && styles.disabledButton]}
          disabled={!flatNum}
          onPress={() => onConfirm(label ?? 'Home')}
          activeOpacity={0.8}>
          <Text style={styles.confirmText}>Confirm Address</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  addressHeadline: {
    fontWeight: '700',
    color: '#525252',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#e9e7e7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#FFF',
  },
  chipSectionContainer: {
    marginTop: 2,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    minWidth: 64,
  },
  activeChip: {
    backgroundColor:
      theme.colors.primary === '#990000' || theme.colors.primary === '#cc0000'
        ? '#FCE8E6'
        : '#FFF0EE',
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  activeChipText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
