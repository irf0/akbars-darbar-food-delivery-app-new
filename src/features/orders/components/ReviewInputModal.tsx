import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '@theme';

interface Props {
  ref?: React.Ref<BottomSheet>;
  snapPoints: string[];
  value: string;
  onChange: (text: string) => void;
  rating: number;
  onRatingChange: (rating: number) => void;
  onSubmit: () => void;
}

const RATING_FEEDBACK: Record<number, { emoji: string; label: string }> = {
  1: { emoji: '😞', label: "Didn't like it" },
  2: { emoji: '😕', label: 'Could be better' },
  3: { emoji: '🙂', label: 'It was okayish' },
  4: { emoji: '😃', label: 'Liked it' },
  5: { emoji: '🤩', label: 'Loved it!' },
};

export const ReviewInputModal = ({
  ref,
  snapPoints,
  value,
  onChange,
  rating,
  onRatingChange,
  onSubmit,
}: Props) => {
  const feedback = RATING_FEEDBACK[rating];

  const canSubmit = rating > 0 && (rating >= 3 || value.trim().length > 0);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handleIndicator}>
      <BottomSheetView style={styles.sheetContainer}>
        <Text style={styles.title}>Rate your order</Text>
        <Text style={styles.subtitle}>Your feedback helps us improve</Text>

        <View style={styles.ratingCard}>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((starNumber) => (
              <TouchableOpacity
                key={starNumber}
                onPress={() => onRatingChange(starNumber)}
                hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}>
                <Text style={starNumber <= rating ? styles.starFilled : styles.starEmpty}>★</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.feedbackRow}>
            <Text style={styles.feedbackEmoji}>{feedback ? feedback.emoji : '☆'}</Text>
            <Text style={styles.feedbackLabel}>
              {feedback ? feedback.label : 'Tap a star to rate'}
            </Text>
          </View>
        </View>

        <BottomSheetTextInput
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          placeholder={
            rating > 0 && rating < 3
              ? 'Please tell us what went wrong...'
              : 'Tell us more about your experience...'
          }
          placeholderTextColor="#9C9C9C"
          value={value}
          onChangeText={onChange}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.confirmButton, !canSubmit && styles.disabledButton]}
          activeOpacity={0.8}
          disabled={!canSubmit}
          onPress={onSubmit}>
          <Text style={styles.confirmText}>Submit Review</Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  hintText: {
    fontSize: 12,
    color: '#C62828',
    textAlign: 'center',
    marginTop: -6,
  },
  sheetBackground: {
    backgroundColor: '#FAFAF9',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  handleIndicator: {
    backgroundColor: '#D9D9D9',
    width: 40,
  },
  sheetContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#8B8B8B',
    textAlign: 'center',
    marginTop: -8,
  },
  ratingCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 18,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starFilled: {
    fontSize: 34,
    color: '#FFC107',
  },
  starEmpty: {
    fontSize: 34,
    color: '#DADADA',
  },
  feedbackRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  feedbackEmoji: {
    fontSize: 18,
  },
  feedbackLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  input: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: '#FFF',
    minHeight: 110,
  },
  confirmButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 2,
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
