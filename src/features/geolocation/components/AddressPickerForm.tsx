import React, { useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  isConfirming: boolean;
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
  flatNum,
  landmark,
  label,
  setLabel,
  setStreet,
  setFlatNum,
  setLandMark,
  isConfirming,
  onConfirm,
}: FormProps) => {
  const isFormValid = street.trim() !== '' && flatNum.trim() !== '';

  const [focusedInput, setFocusedInput] = useState<'street' | 'flatNum' | 'landmark' | null>(null);
  const [streetError, setStreetError] = useState(false);
  const [flatNumError, setFlatNumError] = useState(false);

  const [streetShake] = useState(() => new Animated.Value(0));
  const [flatNumShake] = useState(() => new Animated.Value(0));

  const shake = (value: Animated.Value) => {
    value.setValue(0);
    Animated.sequence([
      Animated.timing(value, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(value, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(value, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(value, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const shakeStyle = (value: Animated.Value) => ({
    transform: [
      {
        translateX: value.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [-6, 0, 6],
        }),
      },
    ],
  });

  const handleConfirmPress = () => {
    if (isConfirming) return;
    if (!isFormValid) {
      theme.haptics.error();
      const streetEmpty = street.trim() === '';
      const flatEmpty = flatNum.trim() === '';
      setStreetError(streetEmpty);
      setFlatNumError(flatEmpty);
      if (streetEmpty) shake(streetShake);
      if (flatEmpty) shake(flatNumShake);
      return;
    }
    setStreetError(false);
    setFlatNumError(false);
    onConfirm(label ?? 'Home');
  };

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={0}>
      <BottomSheetView style={styles.sheetContainer}>
        <Text style={styles.addressHeadline}>{'Move the map to set your location'}</Text>

        <Animated.View style={shakeStyle(streetShake)}>
          <Text style={styles.inputLabel}>Street / Area name (Required)</Text>
          <BottomSheetTextInput
            placeholder="e.g. MG Road, Sector 5"
            placeholderTextColor="#9E9E9E"
            value={street}
            onFocus={() => setFocusedInput('street')}
            onBlur={() => setFocusedInput(null)}
            onChangeText={(text) => {
              setStreet(text);
              if (streetError) setStreetError(false);
            }}
            style={[
              styles.input,
              focusedInput === 'street' && styles.inputFocused,
              streetError && styles.inputError,
            ]}
          />
        </Animated.View>

        <Animated.View style={shakeStyle(flatNumShake)}>
          <Text style={styles.inputLabel}>Flat / House No., Building, Floor (Required)</Text>
          <BottomSheetTextInput
            placeholder="e.g. Flat 302, Sunrise Apartments"
            placeholderTextColor="#9E9E9E"
            value={flatNum}
            onFocus={() => setFocusedInput('flatNum')}
            onBlur={() => setFocusedInput(null)}
            onChangeText={(text) => {
              setFlatNum(text);
              if (flatNumError) setFlatNumError(false);
            }}
            style={[
              styles.input,
              focusedInput === 'flatNum' && styles.inputFocused,
              flatNumError && styles.inputError,
            ]}
          />
        </Animated.View>

        <View>
          <Text style={styles.inputLabel}>Nearby Landmark (Optional)</Text>
          <BottomSheetTextInput
            placeholder="e.g. Opposite City Mall"
            placeholderTextColor="#9E9E9E"
            value={landmark}
            onFocus={() => setFocusedInput('landmark')}
            onBlur={() => setFocusedInput(null)}
            onChangeText={setLandMark}
            style={[styles.input, focusedInput === 'landmark' && styles.inputFocused]}
          />
        </View>

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
          style={[styles.confirmButton, (!isFormValid || isConfirming) && styles.disabledButton]}
          onPress={handleConfirmPress}
          disabled={isConfirming}
          activeOpacity={0.8}>
          {isConfirming ? (
            <View style={styles.confirmLoadingRow}>
              <ActivityIndicator size="small" color={theme.colors.textInverse} />
              <Text style={styles.confirmText}>Confirming...</Text>
            </View>
          ) : (
            <Text style={styles.confirmText}>Confirm Address</Text>
          )}
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
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#757575',
    marginBottom: 4,
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
  inputFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 1.5,
  },

  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 1.5,
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
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmLoadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
