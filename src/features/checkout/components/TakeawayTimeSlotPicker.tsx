import React, { useEffect, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet';

import { theme } from '@theme';
import { TimeSlot } from '@utils/generateTimeSlotsForTakeaway';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  slots: TimeSlot[];
  selectedSlot: Date | null;
  onSelect: (slot: Date) => void;
  onClose: () => void;
}

export const TakeawayTimeSlotPicker = ({
  visible,
  slots,
  selectedSlot,
  onSelect,
  onClose,
}: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['60%', '65%'], []);

  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing={false}
      onDismiss={onClose}

      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.4}
          pressBehavior="close"
        />
      )}>
      <View style={styles.header}>
        <Text style={styles.title}>Pickup Today At</Text>

        <Pressable
          style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
          onPress={() => bottomSheetModalRef.current?.dismiss()}>
          <Ionicons name="close" size={18} color="#555" />
        </Pressable>
      </View>
      <BottomSheetFlatList
        data={slots}
        keyExtractor={(item) => item.value.toISOString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const active = selectedSlot?.getTime() === item.value.getTime();

          return (
            <Pressable
              style={[styles.row, active && styles.activeRow]}
              onPress={() => {
                onSelect(item.value);
                bottomSheetModalRef.current?.dismiss();
              }}>
              <Text style={[styles.time, active && styles.activeTime]}>{item.label}</Text>
            </Pressable>
          );
        }}
      />
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  row: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  activeRow: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}15`,
  },

  time: {
    fontSize: 16,
    fontWeight: '600',
  },

  activeTime: {
    color: theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonPressed: {
    opacity: 0.7,
  },
});
