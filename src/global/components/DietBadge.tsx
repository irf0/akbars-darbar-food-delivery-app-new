import { theme } from 'src/theme';
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MenuItem } from '@types';

export const DietBadge = memo(({ type }: { type: MenuItem['item_type'] }) => {
  const color = type === 'Veg' ? '#388E3C' : '#C62828';
  return (
    <View style={[styles.dietDot, { borderColor: color }]}>
      <View style={[styles.dietDotInner, { backgroundColor: color }]} />
    </View>
  );
});

const styles = StyleSheet.create({
  dietDot: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  dietBadgeContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  dietDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
