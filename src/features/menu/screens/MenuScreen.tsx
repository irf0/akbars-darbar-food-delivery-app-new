import React, { useState, useMemo, useRef } from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import { FlashList, FlashListRef } from '@shopify/flash-list'
import { useMenuData } from '../hooks/useMenuData'
import MenuItemCard from '../components/MenuItemCard'
import MenuItemDetailCard from '../components/MenuItemDetailCard'
import { AppSkeleton } from '@components/ui/Skeleton'
import { flattenSections, FlatRow } from '@utils/others/flattenSections'
import { styles } from '../styles/SectionHeader.styles'
import { MenuItem } from 'types'

export const MenuScreen = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const { sections, isLoading, isRefreshing, onRefresh } = useMenuData()
    const listRef = useRef<FlashListRef<FlatRow>>(null)

    const flatData = useMemo(() => flattenSections(sections), [sections])

    // Collect header indices for sticky headers
    const stickyIndices = useMemo(
        () => flatData.reduce<number[]>((acc, row, i) => {
            if (row.type === 'header') acc.push(i)
            return acc
        }, []),
        [flatData]
    )

    if (isLoading) return <AppSkeleton variant='rect' />

    return (
        <SafeAreaView style={styles.screenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <FlashList
                ref={listRef}
                data={flatData}
                keyExtractor={(row) =>
                    row.type === 'header' ? `header-${row.title}` : row.item.id
                }

                getItemType={row => row.type}
                stickyHeaderIndices={stickyIndices}
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                contentContainerStyle={styles.listContent}
                renderItem={({ item: row }) => {
                    if (row.type === 'header') {
                        return (
                            <View style={styles.headerContainer}>
                                <View style={styles.leftColumn}>
                                    <Text style={styles.headerTitle}>{row.title}</Text>
                                    <Text style={styles.metaText}>
                                        {row.count} curated selections
                                    </Text>
                                </View>
                                <View style={styles.minimalistDivider} />
                            </View>
                        )
                    }
                    return (
                        <MenuItemCard
                            orderType='delivery'
                            item={row.item}
                            onAddPress={() => setModalVisible(true)}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}