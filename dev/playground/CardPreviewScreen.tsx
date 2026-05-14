import React, { useRef, useState } from 'react'
import {
    Animated,
    LayoutAnimation,
    PanResponder,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    UIManager,
    View,
    Image,
} from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { Text } from '@ui/Text'
import { Card } from '@ui/Card'
import { Divider } from '@ui/Divider/Divider'

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const RESTAURANTS = [
    {
        id: '1',
        name: 'Nobu Kitchen',
        cuisine: 'Japanese · Sushi',
        image: { uri: 'https://picsum.photos/seed/nobu/800/500' },
        rating: 4.9,
        deliveryTime: '20–30',
        deliveryFee: 'Free delivery',
        distance: '1.2 km',
        tags: ['Popular', 'Top Rated'],
    },
    {
        id: '2',
        name: 'Bella Napoli',
        cuisine: 'Italian · Pizza',
        image: { uri: 'https://picsum.photos/seed/pizza/800/500' },
        rating: 4.7,
        deliveryTime: '25–40',
        deliveryFee: '$1.99 delivery',
        distance: '2.4 km',
        tags: ['New'],
    },
]

const PRODUCTS = [
    {
        id: '1',
        name: 'Nike Air Max 270',
        category: 'Running',
        image: { uri: 'https://picsum.photos/seed/shoe1/600/600' },
        price: 129.99,
        originalPrice: 179.99,
        discount: 28,
        rating: 4.8,
        inStock: true,
    },
    {
        id: '2',
        name: 'Minimal Watch Co.',
        category: 'Accessories',
        image: { uri: 'https://picsum.photos/seed/watch1/600/600' },
        price: 249.00,
        originalPrice: null,
        discount: null,
        rating: 4.6,
        inStock: true,
    },
    {
        id: '3',
        name: 'Leather Crossbody',
        category: 'Bags',
        image: { uri: 'https://picsum.photos/seed/bag1/600/600' },
        price: 89.99,
        originalPrice: 120.00,
        discount: 25,
        rating: 4.5,
        inStock: false,
    },
]

const PROFILES = [
    {
        id: '1',
        name: 'Ariana Clarke',
        handle: '@arianaclarke',
        avatar: { uri: 'https://picsum.photos/seed/face1/200/200' },
        bio: 'UI Designer & Creative Director based in NYC.',
        posts: 284,
        followers: '48.2K',
        following: 312,
        isFollowing: false,
    },
    {
        id: '2',
        name: 'Marcus Reid',
        handle: '@marcusreid',
        avatar: { uri: 'https://picsum.photos/seed/face2/200/200' },
        bio: 'Full-stack dev. Building in public. Coffee addict.',
        posts: 91,
        followers: '12.9K',
        following: 204,
        isFollowing: true,
    },
]

const SWIPEABLE_ITEMS = [
    { id: '1', title: 'Finish onboarding flow', subtitle: 'Design · Due today', tag: 'Urgent' },
    { id: '2', title: 'Review pull request #42', subtitle: 'Engineering · Due tomorrow', tag: 'In Progress' },
    { id: '3', title: 'Update brand guidelines', subtitle: 'Marketing · Due Friday', tag: 'Pending' },
]

const EXPANDABLE_ITEMS = [
    {
        id: '1',
        title: 'What is included in the Pro plan?',
        preview: 'The Pro plan gives you access to unlimited projects...',
        full: 'The Pro plan gives you access to unlimited projects, priority support, advanced analytics, custom integrations, team collaboration tools, and 500GB of storage. You also get early access to all new features before they are released to the public, plus a dedicated account manager for onboarding.',
    },
    {
        id: '2',
        title: 'How does billing work?',
        preview: 'You are billed monthly or annually depending...',
        full: 'You are billed monthly or annually depending on your chosen cycle. Annual plans receive a 20% discount. Invoices are sent on the 1st of each billing period to your registered email. You can upgrade, downgrade, or cancel at any time from the billing settings page.',
    },
]

const ROW_PRODUCTS = [
    {
        id: '1',
        name: 'Wireless Noise Cancelling Headphones',
        brand: 'Sony · WH-1000XM5',
        image: { uri: 'https://picsum.photos/seed/headphones/200/200' },
        price: 349.99,
        color: 'Midnight Black',
    },
    {
        id: '2',
        name: 'Mechanical Keyboard TKL',
        brand: 'Keychron · K2 Pro',
        image: { uri: 'https://picsum.photos/seed/keyboard/200/200' },
        price: 119.99,
        color: 'Space Grey',
    },
]

// ─── Shared ───────────────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: string }) => {
    const { colors, spacing, fontSize, fontFamily } = useTheme()
    return (
        <Text
            style={{
                fontSize: fontSize.xs,
                fontFamily: fontFamily.semibold,
                color: colors.textSecondary,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                marginBottom: spacing.sm,
                marginTop: spacing.lg,
            }}
        >
            {children}
        </Text>
    )
}

const MetaChip = ({ icon, label }: { icon: string; label: string }) => {
    const { colors, fontSize, fontFamily } = useTheme()
    return (
        <View style={s.row}>
            <Text style={{ fontSize: fontSize.xs }}>{icon}</Text>
            <Text style={{ fontSize: fontSize.xs, color: colors.textSecondary, fontFamily: fontFamily.medium, marginLeft: 3 }}>
                {label}
            </Text>
        </View>
    )
}

const StatItem = ({ label, value }: { label: string; value: string }) => {
    const { colors, fontSize, fontFamily } = useTheme()
    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: fontSize.md, fontFamily: fontFamily.bold, color: colors.text }}>{value}</Text>
            <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.regular, color: colors.textSecondary, marginTop: 2 }}>{label}</Text>
        </View>
    )
}

// ─── 1. Restaurant Card ───────────────────────────────────────────────────────

const RestaurantCard = ({ item }: { item: typeof RESTAURANTS[0] }) => {
    const { colors, spacing, radius, fontSize, fontFamily } = useTheme()
    return (
        <Card variant="elevated" size="sm" onPress={() => { }}>
            <View>
                <Card.Image source={item.image} aspectRatio={16 / 9} />
                <View style={[s.tagRow, { top: spacing.sm, left: spacing.sm }]}>
                    {item.tags.map(tag => (
                        <View key={tag} style={[s.tag, { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 3 }]}>
                            <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.semibold, color: '#fff' }}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <Card.Body>
                <View style={s.row}>
                    <Text style={{ fontSize: fontSize.lg, fontFamily: fontFamily.bold, color: colors.text, flex: 1 }}>{item.name}</Text>
                    <View style={s.row}>
                        <Text style={{ color: '#F59E0B', fontSize: 12 }}>★</Text>
                        <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.semibold, color: colors.text, marginLeft: 3 }}>{item.rating}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: fontSize.sm, color: colors.textSecondary, fontFamily: fontFamily.regular, marginTop: 2 }}>{item.cuisine}</Text>
                <Divider spacing="sm" />
                <View style={[s.row, { justifyContent: 'flex-start', gap: spacing.md }]}>
                    <MetaChip icon="🕐" label={`${item.deliveryTime} min`} />
                    <MetaChip icon="📍" label={item.distance} />
                    <MetaChip icon="🛵" label={item.deliveryFee} />
                </View>
            </Card.Body>
        </Card>
    )
}

// ─── 2. Product Grid Card ─────────────────────────────────────────────────────

const ProductCard = ({ item }: { item: typeof PRODUCTS[0] }) => {
    const { colors, spacing, radius, fontSize, fontFamily } = useTheme()
    return (
        <Card variant="elevated" size="sm" onPress={item.inStock ? () => { } : undefined}>
            <View>
                <Card.Image source={item.image} aspectRatio={1} />
                {item.discount && (
                    <View style={[s.badge, { backgroundColor: colors.error, borderRadius: radius.sm, top: spacing.sm, right: spacing.sm, paddingHorizontal: spacing.xs, paddingVertical: 2 }]}>
                        <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.bold, color: '#fff' }}>-{item.discount}%</Text>
                    </View>
                )}
                {!item.inStock && (
                    <View style={s.outOfStock}>
                        <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.semibold, color: '#fff' }}>Out of Stock</Text>
                    </View>
                )}
            </View>
            <Card.Body>
                <Text style={{ fontSize: fontSize.xs, color: colors.textSecondary, fontFamily: fontFamily.medium, letterSpacing: 0.5, textTransform: 'uppercase' }}>{item.category}</Text>
                <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.semibold, color: colors.text, marginTop: 2 }} numberOfLines={1}>{item.name}</Text>
                <View style={[s.row, { marginTop: 4 }]}>
                    <Text style={{ color: '#F59E0B', fontSize: 11 }}>★</Text>
                    <Text style={{ fontSize: fontSize.xs, color: colors.textSecondary, fontFamily: fontFamily.regular, marginLeft: 2 }}>{item.rating}</Text>
                </View>
                <View style={[s.row, { marginTop: spacing.xs, gap: spacing.xs }]}>
                    <Text style={{ fontSize: fontSize.md, fontFamily: fontFamily.bold, color: colors.primary }}>${item.price.toFixed(2)}</Text>
                    {item.originalPrice && (
                        <Text style={{ fontSize: fontSize.xs, color: colors.textSecondary, textDecorationLine: 'line-through' }}>${item.originalPrice.toFixed(2)}</Text>
                    )}
                </View>
                <TouchableOpacity
                    disabled={!item.inStock}
                    activeOpacity={0.8}
                    style={[s.cartBtn, { backgroundColor: item.inStock ? colors.primary : colors.surfaceAlt, borderRadius: radius.sm, marginTop: spacing.sm, paddingVertical: spacing.sm }]}
                >
                    <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.semibold, color: item.inStock ? '#fff' : colors.textSecondary, textAlign: 'center' }}>
                        {item.inStock ? 'Add to Cart' : 'Unavailable'}
                    </Text>
                </TouchableOpacity>
            </Card.Body>
        </Card>
    )
}

// ─── 3. Profile Card ──────────────────────────────────────────────────────────

const ProfileCard = ({ item }: { item: typeof PROFILES[0] }) => {
    const { colors, spacing, radius, fontSize, fontFamily } = useTheme()
    const [following, setFollowing] = useState(item.isFollowing)
    return (
        <Card variant="outlined" size="md">
            <Card.Body>
                <View style={s.profileTop}>
                    <Image source={item.avatar} style={{ width: 56, height: 56, borderRadius: radius.full, backgroundColor: colors.surfaceAlt }} />
                    <TouchableOpacity
                        onPress={() => setFollowing(f => !f)}
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: following ? 'transparent' : colors.primary,
                            borderRadius: radius.full,
                            paddingHorizontal: spacing.md,
                            paddingVertical: spacing.xs,
                            borderWidth: 1,
                            borderColor: following ? colors.border : colors.primary,
                        }}
                    >
                        <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.semibold, color: following ? colors.text : '#fff' }}>
                            {following ? 'Following' : 'Follow'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: spacing.sm }}>
                    <Text style={{ fontSize: fontSize.md, fontFamily: fontFamily.bold, color: colors.text }}>{item.name}</Text>
                    <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.textSecondary, marginTop: 1 }}>{item.handle}</Text>
                </View>
                <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.text, marginTop: spacing.sm, lineHeight: 20 }} numberOfLines={2}>{item.bio}</Text>
                <Divider spacing="sm" />
                <View style={s.statsRow}>
                    <StatItem label="Posts" value={String(item.posts)} />
                    <View style={{ width: 1, backgroundColor: colors.border }} />
                    <StatItem label="Followers" value={item.followers} />
                    <View style={{ width: 1, backgroundColor: colors.border }} />
                    <StatItem label="Following" value={String(item.following)} />
                </View>
            </Card.Body>
        </Card>
    )
}

// ─── 4. My Profile Card ───────────────────────────────────────────────────────

const MY_PROFILE = {
    name: 'Jordan Ellis',
    handle: '@jordanellis',
    avatar: { uri: 'https://picsum.photos/seed/face5/200/200' },
    location: 'San Francisco, CA',
    joined: 'Joined March 2022',
}

const MyProfileCard = () => {
    const { colors, spacing, radius, fontSize, fontFamily } = useTheme()

    return (
        <Card variant="elevated" size="md">
            <Card.Body>
                {/* Avatar + Edit button */}
                <View style={[s.row, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>
                    <View style={{ position: 'relative' }}>
                        <Image
                            source={MY_PROFILE.avatar}
                            style={{
                                width: 72,
                                height: 72,
                                borderRadius: radius.full,
                                backgroundColor: colors.surfaceAlt,
                            }}
                        />
                        {/* Online indicator */}
                        <View style={{
                            position: 'absolute',
                            bottom: 2,
                            right: 2,
                            width: 14,
                            height: 14,
                            borderRadius: 7,
                            backgroundColor: '#22C55E',
                            borderWidth: 2,
                            borderColor: colors.surface,
                        }} />
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: radius.sm,
                            paddingHorizontal: spacing.md,
                            paddingVertical: spacing.xs,
                        }}
                    >
                        <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.semibold, color: colors.text }}>
                            Edit Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Name + handle */}
                <View style={{ marginTop: spacing.md }}>
                    <Text style={{ fontSize: fontSize.xl, fontFamily: fontFamily.bold, color: colors.text }}>
                        {MY_PROFILE.name}
                    </Text>
                    <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.textSecondary, marginTop: 2 }}>
                        {MY_PROFILE.handle}
                    </Text>
                </View>

                <Divider spacing="sm" />

                {/* Meta — location + joined */}
                <View style={{ gap: spacing.xs }}>
                    <View style={[s.row, { gap: spacing.xs }]}>
                        <Text style={{ fontSize: fontSize.sm }}>📍</Text>
                        <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.textSecondary }}>
                            {MY_PROFILE.location}
                        </Text>
                    </View>
                    <View style={[s.row, { gap: spacing.xs }]}>
                        <Text style={{ fontSize: fontSize.sm }}>🗓</Text>
                        <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.textSecondary }}>
                            {MY_PROFILE.joined}
                        </Text>
                    </View>
                </View>
            </Card.Body>
        </Card>
    )
}

// ─── 5. Standard Content Card ─────────────────────────────────────────────────

const StandardContentCard = () => {
    const { colors, spacing, radius, fontSize, fontFamily } = useTheme()
    return (
        <Card variant="elevated" size="md">
            <Card.Image source={{ uri: 'https://picsum.photos/seed/nature1/800/400' }} aspectRatio={16 / 7} />
            <Card.Body>
                <View style={[s.row, { marginBottom: spacing.xs }]}>
                    <View style={{ backgroundColor: colors.primaryLight, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2 }}>
                        <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.semibold, color: colors.primary }}>Travel</Text>
                    </View>
                    <Text style={{ fontSize: fontSize.xs, color: colors.textSecondary, fontFamily: fontFamily.regular, marginLeft: spacing.sm }}>5 min read</Text>
                </View>
                <Text style={{ fontSize: fontSize.xl, fontFamily: fontFamily.bold, color: colors.text, lineHeight: 28 }}>
                    Hidden Gems of Southeast Asia You Need to Visit
                </Text>
                <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 22 }}>
                    From the terraced rice fields of Bali to the lantern-lit streets of Hội An, discover the places most travel guides leave off the map.
                </Text>
            </Card.Body>
            <Card.Footer>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
                    <Image source={{ uri: 'https://picsum.photos/seed/face3/100/100' }} style={{ width: 28, height: 28, borderRadius: radius.full }} />
                    <View>
                        <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.semibold, color: colors.text }}>Sophie Nguyen</Text>
                        <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.regular, color: colors.textSecondary }}>Mar 12, 2025</Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ backgroundColor: colors.primary, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.xs }}
                >
                    <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.semibold, color: '#fff' }}>Read</Text>
                </TouchableOpacity>
            </Card.Footer>
        </Card>
    )
}

// ─── 5. Swipeable Action Card ─────────────────────────────────────────────────

const SWIPE_THRESHOLD = 80
const ACTION_WIDTH = 72

const SwipeableCard = ({
    item,
    onDelete,
    onEdit,
}: {
    item: typeof SWIPEABLE_ITEMS[0]
    onDelete: () => void
    onEdit: () => void
}) => {
    const { colors, spacing, radius, fontSize, fontFamily } = useTheme()
    const translateX = useRef(new Animated.Value(0)).current
    const cardHeight = useRef(new Animated.Value(1)).current // scale for collapse
    const opacity = useRef(new Animated.Value(1)).current

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8 && Math.abs(g.dy) < 20,
            onPanResponderMove: (_, g) => {
                // Clamp: left swipe reveals delete (negative), right swipe reveals edit (positive)
                const clamped = Math.max(-ACTION_WIDTH * 1.4, Math.min(ACTION_WIDTH * 1.4, g.dx))
                translateX.setValue(clamped)
            },
            onPanResponderRelease: (_, g) => {
                if (g.dx < -SWIPE_THRESHOLD) {
                    // Confirmed delete — fly off left then collapse
                    Animated.sequence([
                        Animated.timing(translateX, { toValue: -400, duration: 250, useNativeDriver: true }),
                        Animated.parallel([
                            Animated.timing(cardHeight, { toValue: 0, duration: 200, useNativeDriver: true }),
                            Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
                        ]),
                    ]).start(onDelete)
                } else if (g.dx > SWIPE_THRESHOLD) {
                    // Confirmed edit — spring back and trigger
                    Animated.spring(translateX, { toValue: 0, useNativeDriver: true, tension: 180, friction: 12 }).start(onEdit)
                } else {
                    // Snap back
                    Animated.spring(translateX, { toValue: 0, useNativeDriver: true, tension: 180, friction: 12 }).start()
                }
            },
        })
    ).current

    const tagColor: Record<string, string> = {
        Urgent: colors.error,
        'In Progress': colors.primary,
        Pending: colors.textSecondary,
    }

    return (
        <Animated.View style={{ opacity, transform: [{ scaleY: cardHeight }], marginBottom: spacing.sm, overflow: 'hidden' }}>
            {/* Underlying action layers */}
            <View style={[StyleSheet.absoluteFill, s.row, { borderRadius: radius.md, overflow: 'hidden' }]}>
                {/* Edit — left reveal */}
                <View style={{ flex: 1, backgroundColor: colors.primary, justifyContent: 'center', paddingLeft: spacing.lg }}>
                    <Text style={{ fontSize: 20 }}>✏️</Text>
                    <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.semibold, color: '#fff', marginTop: 2 }}>Edit</Text>
                </View>
                {/* Delete — right reveal */}
                <View style={{ flex: 1, backgroundColor: colors.error, justifyContent: 'center', alignItems: 'flex-end', paddingRight: spacing.lg }}>
                    <Text style={{ fontSize: 20 }}>🗑️</Text>
                    <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.semibold, color: '#fff', marginTop: 2 }}>Delete</Text>
                </View>
            </View>

            {/* Card surface */}
            <Animated.View
                {...panResponder.panHandlers}
                style={{ transform: [{ translateX }] }}
            >
                <Card variant="elevated" size="md">
                    <Card.Body>
                        <View style={s.row}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: fontSize.md, fontFamily: fontFamily.semibold, color: colors.text }}>{item.title}</Text>
                                <Text style={{ fontSize: fontSize.xs, color: colors.textSecondary, fontFamily: fontFamily.regular, marginTop: 3 }}>{item.subtitle}</Text>
                            </View>
                            <View style={{ backgroundColor: tagColor[item.tag] + '20', borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 3 }}>
                                <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.semibold, color: tagColor[item.tag] }}>{item.tag}</Text>
                            </View>
                        </View>
                    </Card.Body>
                </Card>
            </Animated.View>
        </Animated.View>
    )
}

const SwipeableSection = () => {
    const [items, setItems] = useState(SWIPEABLE_ITEMS)
    const remove = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setItems(prev => prev.filter(i => i.id !== id))
    }
    return (
        <View>
            {items.map(item => (
                <SwipeableCard
                    key={item.id}
                    item={item}
                    onDelete={() => remove(item.id)}
                    onEdit={() => { }}
                />
            ))}
            {items.length === 0 && (
                <View style={{ alignItems: 'center', paddingVertical: 24 }}>
                    <Text style={{ fontSize: 32 }}>🎉</Text>
                    <Text variant="body" color="secondary">All tasks cleared</Text>
                </View>
            )}
        </View>
    )
}

// ─── 6. Expandable Detail Card ────────────────────────────────────────────────

const ExpandableCard = ({ item }: { item: typeof EXPANDABLE_ITEMS[0] }) => {
    const { colors, spacing, radius, fontSize, fontFamily } = useTheme()
    const [expanded, setExpanded] = useState(false)
    const animValue = useRef(new Animated.Value(0)).current
    const measuredH = useRef(0)

    const toggle = () => {
        const toValue = expanded ? 0 : 1
        Animated.spring(animValue, { toValue, useNativeDriver: false, tension: 120, friction: 14 }).start()
        setExpanded(e => !e)
    }

    const maxHeight = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, measuredH.current || 200],
    })

    const chevronRotate = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    })

    return (
        <Card variant="outlined" size="md" style={{ marginBottom: spacing.sm }}>
            <Card.Body>
                <TouchableOpacity activeOpacity={0.7} onPress={toggle} style={[s.row, { justifyContent: 'space-between' }]}>
                    <Text style={{ fontSize: fontSize.md, fontFamily: fontFamily.semibold, color: colors.text, flex: 1, paddingRight: spacing.sm }}>
                        {item.title}
                    </Text>
                    <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
                        <Text style={{ fontSize: fontSize.md, color: colors.textSecondary }}>⌄</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Preview text — always visible */}
                {!expanded && (
                    <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 20 }} numberOfLines={2}>
                        {item.preview}
                    </Text>
                )}

                {/* Expanded content — animated */}
                <Animated.View style={{ maxHeight, overflow: 'hidden' }}>
                    <View
                        onLayout={e => { measuredH.current = e.nativeEvent.layout.height }}
                        style={{ paddingTop: spacing.sm }}
                    >
                        <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.regular, color: colors.text, lineHeight: 22 }}>
                            {item.full}
                        </Text>
                    </View>
                </Animated.View>
            </Card.Body>
        </Card>
    )
}

// ─── 7. Product Row Card ──────────────────────────────────────────────────────

const ProductRowCard = ({ item }: { item: typeof ROW_PRODUCTS[0] }) => {
    const { colors, spacing, radius, fontSize, fontFamily } = useTheme()
    const [qty, setQty] = useState(1)

    return (
        <Card variant="elevated" size="sm" style={{ marginBottom: spacing.sm }}>
            <Card.Body>
                <View style={s.row}>
                    {/* Thumbnail */}
                    <Image
                        source={item.image}
                        style={{ width: 88, height: 88, borderRadius: radius.md, backgroundColor: colors.surfaceAlt }}
                        resizeMode="cover"
                    />

                    {/* Details */}
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                        <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.bold, color: colors.text, lineHeight: 20 }} numberOfLines={2}>
                            {item.name}
                        </Text>
                        <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.regular, color: colors.textSecondary, marginTop: 2 }}>
                            {item.brand}
                        </Text>
                        <Text style={{ fontSize: fontSize.xs, fontFamily: fontFamily.regular, color: colors.textSecondary, marginTop: 1 }}>
                            {item.color}
                        </Text>

                        {/* Price + qty row */}
                        <View style={[s.row, { marginTop: spacing.sm, justifyContent: 'space-between' }]}>
                            <Text style={{ fontSize: fontSize.md, fontFamily: fontFamily.bold, color: colors.primary }}>
                                ${(item.price * qty).toFixed(2)}
                            </Text>

                            {/* Quantity selector */}
                            <View style={[s.row, { backgroundColor: colors.surfaceAlt, borderRadius: radius.sm, overflow: 'hidden' }]}>
                                <TouchableOpacity
                                    onPress={() => setQty(q => Math.max(1, q - 1))}
                                    activeOpacity={0.7}
                                    style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ fontSize: fontSize.md, fontFamily: fontFamily.semibold, color: colors.text }}>−</Text>
                                </TouchableOpacity>

                                <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: fontSize.sm, fontFamily: fontFamily.bold, color: colors.text }}>{qty}</Text>
                                </View>

                                <TouchableOpacity
                                    onPress={() => setQty(q => q + 1)}
                                    activeOpacity={0.7}
                                    style={{ width: 32, height: 32, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ fontSize: fontSize.md, fontFamily: fontFamily.semibold, color: colors.primary }}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Card.Body>
        </Card>
    )
}

// ─── Shared StyleSheet ────────────────────────────────────────────────────────

const s = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center' },
    tagRow: { position: 'absolute', flexDirection: 'row', gap: 6, zIndex: 10 },
    tag: {},
    badge: { position: 'absolute', zIndex: 10 },
    outOfStock: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center' },
    cartBtn: { width: '100%' },
    profileTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
    statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
})

// ─── Screen ───────────────────────────────────────────────────────────────────

const CardPreviewScreen = () => {
    const { colors, spacing } = useTheme()

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl * 2 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Existing sections */}
            <SectionLabel>Food & Restaurant</SectionLabel>
            {RESTAURANTS.map(item => (
                <View key={item.id} style={{ marginBottom: spacing.md }}>
                    <RestaurantCard item={item} />
                </View>
            ))}

            <SectionLabel>E-Commerce · Product Grid</SectionLabel>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }}>
                {PRODUCTS.map(item => (
                    <View key={item.id} style={{ width: '47%' }}>
                        <ProductCard item={item} />
                    </View>
                ))}
            </View>

            <SectionLabel>Profile / User</SectionLabel>
            {PROFILES.map(item => (
                <View key={item.id} style={{ marginBottom: spacing.md }}>
                    <ProfileCard item={item} />
                </View>
            ))}

            <Divider spacing="lg" label="New Varieties" />

            {/* Standard Content Card */}
            <SectionLabel>Standard Content Card</SectionLabel>
            <StandardContentCard />

            {/* Swipeable */}
            <SectionLabel>Swipeable Action Card · swipe left to delete, right to edit</SectionLabel>
            <SwipeableSection />

            {/* Expandable */}
            <SectionLabel>Expandable Detail Card</SectionLabel>
            {EXPANDABLE_ITEMS.map(item => (
                <ExpandableCard key={item.id} item={item} />
            ))}

            {/* Product Row */}
            <SectionLabel>Product Row Card</SectionLabel>
            {ROW_PRODUCTS.map(item => (
                <ProductRowCard key={item.id} item={item} />
            ))}

            {/* My Profile */}
            <SectionLabel>My Profile Card</SectionLabel>
            <MyProfileCard />
        </ScrollView>
    )
}

export default CardPreviewScreen