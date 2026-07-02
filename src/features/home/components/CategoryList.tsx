import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from 'src/theme'
import { Image } from 'expo-image'

const t = theme

const CATEGORY_ICONS: Record<string, any> = {
    beverages: require('../../../../assets/CategoryIcons/category-beverages.png'),
    biryani: require('../../../../assets/CategoryIcons/category-biryani.png'),
    snacks: require('../../../../assets/CategoryIcons/category-dessert.png'),
    egg: require('../../../../assets/CategoryIcons/category-egg.png'),
    gravy: require('../../../../assets/CategoryIcons/category-gravy.png'),
    roti: require('../../../../assets/CategoryIcons/category-roti.png'),
    salad: require('../../../../assets/CategoryIcons/category-salad.png'),
    starters: require('../../../../assets/CategoryIcons/category-starters.png'),
    tandoori: require('../../../../assets/CategoryIcons/category-tandoori.png'),
}

const FALLBACK_ICON = CATEGORY_ICONS.starters

function getCategoryIcon(category: string) {
    return CATEGORY_ICONS[category.toLowerCase()] ?? FALLBACK_ICON
}

interface Props {
    categories: string[]
    onCategoryPress: (category: string) => void


}

export const CategoryList = ({ categories, onCategoryPress }: Props) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={i => i}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.categoryChip}
                        activeOpacity={0.7}
                        onPress={() => onCategoryPress(item)}
                    >
                        <Image source={getCategoryIcon(item)} style={styles.categoryIcon} />
                        <Text style={styles.categoryEmoji}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

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
    sectionLink: {
        fontSize: t.fontSize.sm,
        color: t.colors.primary,
        fontWeight: t.fontWeight.semibold,
    },
    categoryChip: {
        alignItems: 'center',
        backgroundColor: t.colors.surface,
        borderRadius: t.radius.lg,
        paddingHorizontal: t.spacing.md,
        paddingVertical: t.spacing.sm,
        borderWidth: 1,
        borderColor: t.colors.border,
        gap: 4,
        minWidth: 70,
    },
    categoryIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    categoryEmoji: { fontSize: 24 },
    categoryName: {
        fontSize: t.fontSize.xs,
        fontWeight: t.fontWeight.medium,
        color: t.colors.text,
    },
})