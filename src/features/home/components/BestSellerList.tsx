import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'expo-image'
import useBestSellers from '@hooks/useBestSellers'
import { theme } from '@theme'
import { MenuItem, OrderType } from 'types'
import { useOrderTypeStore } from '@store/useOrderTypeStore'
import { getDisplayPrice } from '@utils/getDisplayPrice'
import { DietBadge } from '@components/DietBadge'
import { usePortionSelectorStore } from '@store/usePortionSelectorStore'


interface Props {
    onItemPress: (item: MenuItem) => void
}

const BestSellerList = ({ onItemPress }: Props) => {
    const { bestSellers } = useBestSellers()
    const { orderType } = useOrderTypeStore()
    const openModal = usePortionSelectorStore((state) => state.openModal)

    const handleAddBtn = (item: MenuItem) => {
        const halfPrice = orderType === 'delivery' ? item.half_delivery_price : item.half_takeaway_price

        if (halfPrice === 0) {
            console.log('Directly add to cart!')
        } else {
            openModal(item)
        }
    }
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
                        <View>
                            <Pressable
                                onPress={() => onItemPress(item)}
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
                            <TouchableOpacity
                                style={{ padding: 20, backgroundColor: "red" }}
                                onPress={() => handleAddBtn(item)}>
                                <Text>ADD</Text>
                            </TouchableOpacity>
                        </View>
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