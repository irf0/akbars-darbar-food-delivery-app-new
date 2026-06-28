import React, { useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'
import {
    ActivityIndicator,
    FlatList,
    ListRenderItem,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { Image } from 'expo-image'
import { MenuItem } from 'types'
import { useMenuSearch } from '../hooks/useMenuSearch'
import { theme } from '@theme'
import { SafeAreaView } from 'react-native-safe-area-context'

const VEG_GREEN = '#0F8A3D'
const NON_VEG_RED = '#E04141'
const ITEM_HEIGHT = 96

type MenuRowProps = {
    item: MenuItem
}

const MenuRow = React.memo(({ item }: MenuRowProps) => {
    return (
        <Pressable style={styles.item}>
            {!!item.image ? (
                <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    transition={100}
                />
            ) : (
                <View style={styles.itemImageFallback}>
                    <Ionicons name="restaurant-outline" size={18} color="#B5B5B5" />
                </View>
            )}

            <View style={styles.itemContent}>
                <View style={styles.titleRow}>
                    <View
                        style={[
                            styles.dietDot,
                            {
                                borderColor:
                                    item.item_type === 'Veg' ? VEG_GREEN : NON_VEG_RED
                            }
                        ]}
                    >
                        <View
                            style={[
                                styles.dietDotInner,
                                {
                                    backgroundColor:
                                        item.item_type === 'Veg' ? VEG_GREEN : NON_VEG_RED
                                }
                            ]}
                        />
                    </View>

                    <Text style={styles.title} numberOfLines={1}>
                        {item.name}
                    </Text>
                </View>

                {!!item.subCategory && (
                    <Text style={styles.subtitle} numberOfLines={1}>
                        {item.subCategory}
                    </Text>
                )}
            </View>
        </Pressable>
    )
})

const SearchScreen = () => {
    const { filteredItems, searchQuery, setSearchQuery, loading } = useMenuSearch()
    const navigation = useNavigation()
    const theme = useTheme()
    const [isFocused, setIsFocused] = useState(false)

    const hasQuery = searchQuery.trim().length > 0
    const hasResults = filteredItems.length > 0

    const renderItem = useCallback<ListRenderItem<MenuItem>>(
        ({ item }) => <MenuRow item={item} />,
        []
    )

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={42} color="#CFCFCF" />
            <Text style={styles.emptyTitle}>
                {hasQuery ? 'No results found' : 'Search menu items'}
            </Text>
            <Text style={styles.emptySubtitle}>
                {hasQuery
                    ? 'Try searching something else'
                    : 'Search dishes, cuisines or categories'}
            </Text>
        </View>
    )

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} color={theme.colors.text} />
                    </Pressable>

                    <Text style={styles.headerTitle}>Search menu</Text>
                </View>

                <View style={styles.searchWrapper}>
                    <View style={[styles.searchBox, isFocused && styles.searchBoxFocused]}>
                        <Ionicons
                            name="search"
                            size={18}
                            color={isFocused ? theme.colors.primary : '#999'}
                        />

                        <TextInput
                            style={styles.input}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search dishes"
                            placeholderTextColor="#999"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />

                        {hasQuery && (
                            <Pressable onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={18} color="#C9C9C9" />
                            </Pressable>
                        )}
                    </View>
                </View>

                {loading && (
                    <View style={{ paddingVertical: 20 }}>
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                    </View>
                )}

                <FlatList
                    data={filteredItems}
                    renderItem={renderItem}
                    keyExtractor={(item: MenuItem) => item.id}
                    ListEmptyComponent={!loading ? renderEmptyState : null}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        styles.listContent,
                        !hasResults && { flexGrow: 1 }
                    ]}
                    getItemLayout={(_, index) => ({
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index,
                    })}
                    initialNumToRender={12}
                    maxToRenderPerBatch={8}
                    windowSize={8}
                    removeClippedSubviews
                />
            </View>
        </SafeAreaView>
    )
}

export default SearchScreen

const t = theme

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
        gap: 14
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111'
    },

    searchWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 14
    },

    searchBox: {
        height: 44,
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },

    searchBoxFocused: {
        borderColor: t.colors.primary,
        backgroundColor: '#FFF'
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#111'
    },

    listContent: {
        paddingBottom: 20
    },

    item: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5'
    },

    itemImage: {
        width: 72,
        height: 72,
        borderRadius: 8,
        marginRight: 12
    },

    itemImageFallback: {
        width: 72,
        height: 72,
        borderRadius: 8,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },

    itemContent: {
        flex: 1,
        justifyContent: 'center'
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },

    dietDot: {
        width: 14,
        height: 14,
        borderWidth: 1.2,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginRight: 6
    },

    dietDotInner: {
        width: 6,
        height: 6,
        borderRadius: 999
    },

    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#111',
        lineHeight: 22
    },

    subtitle: {
        marginTop: 4,
        marginLeft: 20,
        fontSize: 13,
        color: '#777'
    },

    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32
    },

    emptyTitle: {
        marginTop: 16,
        fontSize: 17,
        fontWeight: '700',
        color: '#111'
    },

    emptySubtitle: {
        marginTop: 8,
        fontSize: 13,
        color: '#888',
        textAlign: 'center'
    }
})