import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from '@theme'
import { MenuItem } from '../../../../types/index'
import { AdminSettings } from '../../../../types/index'
import { MenuItemCard } from './MenuItemCard'

const t = theme

interface Props {
    items: MenuItem[]
    loading: boolean
    settings: AdminSettings | null
    onItemPress: (itemId: string) => void
    onViewAllPress: () => void
}

export const BestSellerList = ({ items, loading, settings, onItemPress, onViewAllPress }: Props) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>⭐ Best Sellers</Text>
                <TouchableOpacity onPress={onViewAllPress}>
                    <Text style={styles.sectionLink}>View all</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <View style={styles.loadingRow}>
                    {[1, 2, 3].map(i => <View key={i} style={styles.skeletonCard} />)}
                </View>
            ) : (
                items.slice(0, 5).map(item => (
                    <MenuItemCard
                        key={item.id}
                        item={item}
                        settings={settings}
                        onPress={() => onItemPress(item.id)}
                    />
                ))
            )}
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
    loadingRow: { gap: t.spacing.sm },
    skeletonCard: {
        height: 100,
        backgroundColor: t.colors.border,
        borderRadius: t.radius.lg,
        opacity: 0.5,
    },
})