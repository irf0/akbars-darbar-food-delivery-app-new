import React from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { AppStackParamList } from '@navigation/types'

// ─── Dev Screen Registry ──────────────────────────────────────────────────────
// Add new playground screens here — PlaygroundMenuScreen auto-renders them.

type DevScreenEntry = {
    name: keyof Omit<AppStackParamList, 'MainTabs' | 'PlaygroundMenu'>
    title: string
    description: string
    icon: string
    category: 'Inputs' | 'Display' | 'Feedback' | 'Navigation' | 'Layout' | 'Other'
}

const DEV_SCREENS: DevScreenEntry[] = [
    {
        name: 'ButtonPreview',
        title: 'Button',
        description: 'Variants, sizes, states, loading & icon buttons',
        icon: '⬡',
        category: 'Inputs',
    },
    {
        name: 'InputPreview',
        title: 'Input',
        description: 'Text fields, validation states, multiline & masked',
        icon: '▤',
        category: 'Inputs',
    },
    {
        name: 'DividerPreview',
        title: 'Divider',
        description: 'Horizontal, vertical, labeled & spacing variants',
        icon: '─',
        category: 'Layout',
    },
    {
        name: 'CardPreview',
        title: 'Card',
        description: 'Elevated, outlined, filled & ghost with image, footer & composition',
        icon: '▭',
        category: 'Layout',
    },
    // ↓ Add more entries here as you build new components
]

// ─── Derived category sections ────────────────────────────────────────────────

const CATEGORY_ORDER: DevScreenEntry['category'][] = [
    'Inputs',
    'Display',
    'Feedback',
    'Navigation',
    'Layout',
    'Other',
]

type Section = {
    category: DevScreenEntry['category']
    data: DevScreenEntry[]
}

function groupByCategory(screens: DevScreenEntry[]): Section[] {
    const map = new Map<DevScreenEntry['category'], DevScreenEntry[]>()
    for (const screen of screens) {
        if (!map.has(screen.category)) map.set(screen.category, [])
        map.get(screen.category)!.push(screen)
    }
    return CATEGORY_ORDER.filter((cat) => map.has(cat)).map((cat) => ({
        category: cat,
        data: map.get(cat)!,
    }))
}

// ─── Component ────────────────────────────────────────────────────────────────

type Nav = NativeStackNavigationProp<AppStackParamList, 'PlaygroundMenu'>

export default function PlaygroundMenuScreen() {
    const navigation = useNavigation<Nav>()
    const sections = groupByCategory(DEV_SCREENS)

    const renderItem = ({ item }: { item: DevScreenEntry }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(item.name as any)}
            activeOpacity={0.7}
        >
            <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>{item.icon}</Text>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                </Text>
            </View>
            <Text style={styles.cardChevron}>›</Text>
        </TouchableOpacity>
    )

    const renderSection = ({ item: section }: { item: Section }) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>{section.category.toUpperCase()}</Text>
                <View style={styles.sectionLine} />
            </View>
            {section.data.map((screen) => (
                <React.Fragment key={screen.name}>
                    {renderItem({ item: screen })}
                </React.Fragment>
            ))}
        </View>
    )

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerBadge}>
                    <Text style={styles.headerBadgeText}>DEV</Text>
                </View>
                <Text style={styles.headerTitle}>UI Lab</Text>
                <Text style={styles.headerSubtitle}>
                    {DEV_SCREENS.length} component{DEV_SCREENS.length !== 1 ? 's' : ''} · {sections.length} categor{sections.length !== 1 ? 'ies' : 'y'}
                </Text>
            </View>

            {/* Screen list */}
            <FlatList
                data={sections}
                keyExtractor={(s) => s.category}
                renderItem={renderSection}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

// ─── Design tokens ────────────────────────────────────────────────────────────

const COLORS = {
    bg: '#0D0D0F',
    surface: '#17171A',
    surfaceHover: '#1F1F24',
    border: '#2A2A30',
    accent: '#6EE7B7',       // mint green — dev-tool feel
    accentDim: '#1A3D30',
    text: '#F0F0F5',
    textSecondary: '#8A8A99',
    textMuted: '#55555F',
    badge: '#FF6B35',
} as const

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.bg,
    },

    // Header
    header: {
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 20 : 12,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerBadge: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.badge,
        borderRadius: 4,
        paddingHorizontal: 7,
        paddingVertical: 2,
        marginBottom: 10,
    },
    headerBadgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.2,
    },
    headerTitle: {
        color: COLORS.text,
        fontSize: 32,
        fontWeight: '700',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    headerSubtitle: {
        color: COLORS.textMuted,
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.2,
    },

    // List
    list: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 40,
    },

    // Section
    section: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    sectionLabel: {
        color: COLORS.accent,
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },

    // Card
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 8,
        gap: 14,
    },
    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: COLORS.accentDim,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIconText: {
        fontSize: 18,
        color: COLORS.accent,
    },
    cardBody: {
        flex: 1,
        gap: 3,
    },
    cardTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: -0.1,
    },
    cardDescription: {
        color: COLORS.textSecondary,
        fontSize: 12,
        lineHeight: 17,
    },
    cardChevron: {
        color: COLORS.textMuted,
        fontSize: 22,
        fontWeight: '300',
        marginTop: -1,
    },
})