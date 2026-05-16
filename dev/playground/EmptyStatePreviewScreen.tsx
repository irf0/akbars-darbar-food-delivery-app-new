import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@ui/Text/AppText'
import { AppEmptyState } from '@ui/EmptyState/AppEmptyState'

const SCENARIOS = [
    {
        id: 'search',
        label: 'No Results',
        icon: '🔍',
        title: 'No results found',
        subtitle: 'Try adjusting your search or filters to find what you\'re looking for.',
        action: { label: 'Clear Filters', onPress: () => { } },
    },
    {
        id: 'cart',
        label: 'Empty Cart',
        icon: '🛒',
        title: 'Your cart is empty',
        subtitle: 'Looks like you haven\'t added anything yet. Start shopping!',
        action: { label: 'Browse Products', onPress: () => { } },
        secondAction: { label: 'View Wishlist', onPress: () => { }, variant: 'ghost' as const },
    },
    {
        id: 'notifications',
        label: 'No Notifications',
        icon: '🔔',
        title: 'All caught up!',
        subtitle: 'You have no new notifications right now. Check back later.',
        action: null,
    },
    {
        id: 'offline',
        label: 'No Internet',
        icon: '📡',
        title: 'No internet connection',
        subtitle: 'Please check your connection and try again.',
        action: { label: 'Retry', onPress: () => { }, variant: 'primary' as const },
    },
    {
        id: 'messages',
        label: 'No Messages',
        icon: '💬',
        title: 'No messages yet',
        subtitle: 'Start a conversation with someone and it will show up here.',
        action: { label: 'Start a Chat', onPress: () => { } },
    },
    {
        id: 'favourites',
        label: 'No Favourites',
        icon: '❤️',
        title: 'Nothing saved yet',
        subtitle: 'Tap the heart icon on any item to save it here for later.',
        action: null,
    },
]

const SectionLabel = ({ children }: { children: string }) => {
    const { colors, spacing, fontSize, fontFamily } = useTheme()
    return (
        <AppText
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
        </AppText>
    )
}

const EmptyStatePreviewScreen = () => {
    const { colors, spacing } = useTheme()
    const [activeTab, setActiveTab] = useState(0)

    const tabs = SCENARIOS.map(s => s.label)
    const active = SCENARIOS[activeTab]

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ paddingBottom: spacing.xl * 2 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Scenario tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: 8 }}
            >
                {tabs.map((tab, i) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(i)}
                        activeOpacity={0.8}
                        style={[
                            s.tab,
                            {
                                backgroundColor: activeTab === i ? colors.primary : colors.surfaceAlt,
                                borderRadius: 20,
                            },
                        ]}
                    >
                        <AppText style={{ fontSize: 13, fontWeight: '600', color: activeTab === i ? '#fff' : colors.textSecondary }}>
                            {tab}
                        </AppText>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Active scenario — full height preview */}
            <View style={[s.previewBox, { backgroundColor: colors.surface, margin: spacing.lg, borderRadius: 20 }]}>
                <AppEmptyState
                    icon={active.icon}
                    title={active.title}
                    subtitle={active.subtitle}
                    action={active.action ?? undefined}
                    secondAction={'secondAction' in active ? active.secondAction : undefined}
                    size="md"
                />
            </View>

            {/* Sizes */}
            <View style={{ paddingHorizontal: spacing.lg }}>
                <SectionLabel>Sizes</SectionLabel>
                {(['sm', 'md', 'lg'] as const).map(size => (
                    <View key={size} style={[s.sizeBox, { backgroundColor: colors.surface, borderRadius: 16, marginBottom: spacing.md }]}>
                        <AppEmptyState
                            icon="📭"
                            title="Nothing here yet"
                            subtitle="This is the empty state."
                            action={{ label: 'Take Action', onPress: () => { } }}
                            size={size}
                        />
                        <AppText style={{ position: 'absolute', top: 12, right: 12, fontSize: 11, color: colors.textSecondary, fontWeight: '600' }}>
                            {size}
                        </AppText>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default EmptyStatePreviewScreen

const s = StyleSheet.create({
    tab: { paddingHorizontal: 14, paddingVertical: 8 },
    previewBox: { height: 380, justifyContent: 'center' },
    sizeBox: { position: 'relative', paddingVertical: 24 },
})