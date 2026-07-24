import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from 'src/theme';

const t = theme;

export type CategoryHeaderProps = {
  title: string;
};

const CategoryHeader = React.memo(({ title }: CategoryHeaderProps) => (
  <View style={styles.categoryHeader}>
    <View style={styles.categoryHeaderAccent} />
    <Text style={styles.categoryHeaderText}>{title}</Text>
  </View>
));
CategoryHeader.displayName = 'CategoryHeader';

export default CategoryHeader;

const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.spacing.sm,
    backgroundColor: t.colors.background,
    paddingTop: t.spacing.lg,
    paddingBottom: t.spacing.sm,
  },
  categoryHeaderAccent: {
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: t.colors.primary,
  },
  categoryHeaderText: {
    fontSize: t.fontSize.lg,
    fontWeight: t.fontWeight.bold,
    color: t.colors.text,
    letterSpacing: 0.2,
  },
});
