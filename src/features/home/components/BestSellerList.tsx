import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import useBestSellers from '@hooks/useBestSellers'
import { theme } from '@theme'
import { MenuItem, OrderType } from 'types'
import { useOrderTypeStore } from '@store/orderType/useOrderTypeStore'
import { getDisplayPrice } from '@utils/getDisplayPrice'

const DietBadge = memo(({ type }: { type: MenuItem['item_type'] }) => {
    const color = type === 'Veg' ? '#388E3C' : '#C62828'
    return (
        <View style={[styles.dietDot, { borderColor: color }]}>
            <View style={[styles.dietDotInner, { backgroundColor: color }]} />
        </View>
    )
})

interface Props {
    onItemPress: (item: MenuItem) => void
}

const BestSellerList = ({ onItemPress }: Props) => {
    const { bestSellers } = useBestSellers()
    const { orderType } = useOrderTypeStore()
    return (
        <View>
            <Text>BestSeller List</Text>
            <View>
                {/* image
                dietBadge
                name
                price */}

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={bestSellers}
                    keyExtractor={i => i?.id}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => onItemPress(item)}
                        // style={styles.categoryChip}
                        >
                            <Image
                                cachePolicy={'memory-disk'}
                                source={{ uri: item?.image }}
                                style={{ width: 140, height: 140, borderRadius: 12 }}
                            />
                            <DietBadge type={item.item_type} />
                            <Text >{item?.name}</Text>
                            <Text>₹{getDisplayPrice(item, orderType)}</Text>
                        </Pressable>
                    )}
                />

            </View>
        </View>
    )
}

export default BestSellerList

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
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    dietDotInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },

})