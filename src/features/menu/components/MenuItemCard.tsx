import React, { memo, useCallback } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { MenuItem } from 'types'
import { styles } from '../styles/MenuItemCard.styles'
import { AppBadge } from '@components/ui/Badge'

interface Props {
    item: MenuItem
    orderType: 'delivery' | 'takeaway'
    onAddPress: (item: MenuItem) => void
}

const DietBadge = memo(({ type }: { type: MenuItem['item_type'] }) => {
    const color = type === 'Veg' ? '#388E3C' : '#C62828'
    return (
        <View style={[styles.dietDot, { borderColor: color }]}>
            <View style={[styles.dietDotInner, { backgroundColor: color }]} />
        </View>
    )
})

const MenuItemCard = ({ item, orderType, onAddPress }: Props) => {
    const startingPrice = orderType === 'delivery'
        ? item.half_delivery_price > 0 ? item.half_delivery_price : item.full_delivery_price
        : item.half_takeaway_price > 0 ? item.half_takeaway_price : item.full_takeaway_price

    // Stable press handler scoped to this item
    const handlePress = useCallback(() => {
        onAddPress(item)
    }, [item, onAddPress])

    return (
        <View style={[styles.card, !item.available && styles.cardUnavailable]}>
            <View style={styles.details}>
                <View style={styles.dietBadgeContainer}>
                    <DietBadge type={item.item_type} />
                    <AppBadge label="★ Bestseller" variant="ghost" color="warning" size="sm" />
                </View>

                <Text style={styles.name} numberOfLines={2}>
                    {item.name}
                </Text>

                <Text style={styles.price}>₹{startingPrice}</Text>

                {item.description ? (
                    <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                    </Text>
                ) : null}

                {!item.available && (
                    <Text style={styles.unavailableText}>Currently not available</Text>
                )}
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    contentFit="cover"
                    // Remove transition — causes layout recalc during fast scrolls
                    cachePolicy="memory-disk"  // Cache aggressively
                />
                {item.available && (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handlePress}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.addButtonText}>ADD</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default memo(MenuItemCard)