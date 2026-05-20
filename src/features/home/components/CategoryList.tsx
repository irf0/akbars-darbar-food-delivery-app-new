import React from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from '@theme'

const t = theme.light

const CATEGORIES = [
    { id: '1', name: 'Biryani', emoji: '🍛' },
    { id: '2', name: 'Starters', emoji: '🍗' },
    { id: '3', name: 'Curries', emoji: '🍲' },
    { id: '4', name: 'Breads', emoji: '🫓' },
    { id: '5', name: 'Rice', emoji: '🍚' },
    { id: '6', name: 'Desserts', emoji: '🍮' },
    { id: '7', name: 'Drinks', emoji: '🥤' },
]

interface Props {
    onCategoryPress: (category: string) => void
    onSeeAllPress: () => void
}

export const CategoryList = ({ onCategoryPress, onSeeAllPress }: Props) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity onPress={onSeeAllPress}>
                    <Text style={styles.sectionLink}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={CATEGORIES}
                keyExtractor={i => i.id}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.categoryChip}
                        onPress={() => onCategoryPress(item.name)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                        <Text style={styles.categoryName}>{item.name}</Text>
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
    categoryEmoji: { fontSize: 24 },
    categoryName: {
        fontSize: t.fontSize.xs,
        fontWeight: t.fontWeight.medium,
        color: t.colors.text,
    },
})