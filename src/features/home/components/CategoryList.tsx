import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { theme } from 'src/theme';
import { Image } from 'expo-image';
import { AnimatedPressable } from '@components/ui/AnimatedPressable';

const t = theme;

const CATEGORY_ICONS: Record<string, ImageSourcePropType> = {
  beverages: require('../../../../assets/CategoryIcons/category-beverages.png'),
  biryani: require('../../../../assets/CategoryIcons/category-biryani.png'),
  snacks: require('../../../../assets/CategoryIcons/category-dessert.png'),
  egg: require('../../../../assets/CategoryIcons/category-egg.png'),
  gravy: require('../../../../assets/CategoryIcons/category-gravy.png'),
  roti: require('../../../../assets/CategoryIcons/category-roti.png'),
  salad: require('../../../../assets/CategoryIcons/category-salad.png'),
  starters: require('../../../../assets/CategoryIcons/category-starters.png'),
  tandoori: require('../../../../assets/CategoryIcons/category-tandoori.png'),
};

const FALLBACK_ICON = CATEGORY_ICONS.starters;

function getCategoryIcon(category: string) {
  return CATEGORY_ICONS[category.toLowerCase()] ?? FALLBACK_ICON;
}

function formatCategoryName(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

interface Props {
  categories: string[];
  onCategoryPress: (category: string) => void;
}

export const CategoryList = ({ categories, onCategoryPress }: Props) => {
  return (
    <View style={styles.section}>
      <View>
        <Text style={styles.sectionTitle}>Browse by categories</Text>
        <Text style={styles.sectionSubtitle}>{"Find exactly what you're looking for"}</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(i) => i}
        contentContainerStyle={{ gap: 10, marginTop: 10 }}
        renderItem={({ item }) => (
          <AnimatedPressable style={styles.categoryChip} onPress={() => onCategoryPress(item)}>
            <Image source={getCategoryIcon(item)} style={styles.categoryIcon} />
            <Text style={styles.categoryName}>{formatCategoryName(item)}</Text>
          </AnimatedPressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: t.spacing.xl },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: t.spacing.md,
  },
  sectionTitle: {
    fontSize: t.fontSize.lg,
    fontWeight: t.fontWeight.bold,
    color: t.colors.text,
  },

  sectionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: t.colors.textSecondary,
    fontWeight: '500',
  },
  sectionLink: {
    fontSize: t.fontSize.sm,
    color: t.colors.primary,
    fontWeight: t.fontWeight.semibold,
  },
  categoryChip: {
    alignItems: 'center',
    backgroundColor: t.colors.surface,
    borderRadius: t.radius.lg,
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.md,
    minWidth: 84, // was 70
    gap: 6,
  },
  categoryIcon: {
    width: 40, // was 32
    height: 40,
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: t.fontSize.md,
    fontWeight: t.fontWeight.medium,
    color: t.colors.text,
  },
});
