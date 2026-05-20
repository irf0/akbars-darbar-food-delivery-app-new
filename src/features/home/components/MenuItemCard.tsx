import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@theme'
import { MenuItem } from '../../../../types/index'
import { AdminSettings } from '../../../../types/index'

const t = theme.light

interface Props {
    item: MenuItem
    settings: AdminSettings | null
    onPress: () => void
}

export const MenuItemCard = ({ item, settings, onPress }: Props) => {
    const price = settings?.deliveryEnabled
        ? item.full_delivery_price
        : item.full_takeaway_price

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            <View style={styles.info}>
                <View style={styles.topRow}>
                    <View style={[
                        styles.typeDot,
                        { backgroundColor: item.item_type === 'Veg' ? '#22C55E' : '#EF4444' }
                    ]} />
                    {item.bestSeller && (
                        <View style={styles.bestSellerTag}>
                            <Text style={styles.bestSellerText}>Bestseller</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
                <View style={styles.bottomRow}>
                    <Text style={styles.price}>₹{Math.floor(price)}</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={onPress}>
                        <Ionicons name="add" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: t.colors.surface,
        borderRadius: t.radius.lg,
        marginBottom: t.spacing.sm,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: t.colors.border,
    },
    image: { width: 100, height: 100 },
    info: {
        flex: 1,
        padding: t.spacing.sm,
        justifyContent: 'space-between',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    typeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    bestSellerTag: {
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    bestSellerText: {
        fontSize: 10,
        color: '#92400E',
        fontWeight: '600',
    },
    name: {
        fontSize: t.fontSize.base,
        fontWeight: t.fontWeight.semibold,
        color: t.colors.text,
    },
    description: {
        fontSize: t.fontSize.xs,
        color: t.colors.textSecondary,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: t.fontSize.md,
        fontWeight: t.fontWeight.bold,
        color: t.colors.text,
    },
    addBtn: {
        backgroundColor: t.colors.primary,
        width: 28,
        height: 28,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
})