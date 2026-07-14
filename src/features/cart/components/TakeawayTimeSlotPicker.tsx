import React, { useEffect, useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetFlatList } from '@gorhom/bottom-sheet';

import { theme } from '@theme';
import { TimeSlot } from '@utils/generateTimeSlotsForTakeaway';

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
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['40%', '60%'], []);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.4}
          pressBehavior="close"
        />
      )}>
      <Text style={styles.title}>Pickup Today At</Text>

      <BottomSheetFlatList
        data={slots}
        keyExtractor={(item) => item.value.toISOString()}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const active = selectedSlot?.getTime() === item.value.getTime();

          return (
            <Pressable
              style={[styles.row, active && styles.activeRow]}
              onPress={() => {
                onSelect(item.value);
                bottomSheetRef.current?.close();
              }}>
              <Text style={[styles.time, active && styles.activeTime]}>{item.label}</Text>
            </Pressable>
          );
        }}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheet: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 20,
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
});
