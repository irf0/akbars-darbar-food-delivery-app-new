import React, { useState } from 'react'
import {
    ScrollView,
    View,
    Image,
    Switch,
    StyleSheet,
    SafeAreaView,
    Text,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AppListItem } from '@components/ui/ListItem'
import { useTheme } from '@hooks/useTheme'

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => (
    <View style={s.section}>
        <Text style={s.sectionLabel}>{label}</Text>
        <View style={s.card}>{children}</View>
    </View>
)

export default function ListItemPreviewScreen() {
    const { colors } = useTheme()
    const [isDark, setIsDark] = useState(false)
    const [notifs, setNotifs] = useState(true)

    return (
        <SafeAreaView style={[s.root, { backgroundColor: colors.background }]}>
            <ScrollView
                contentContainerStyle={s.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[s.pageTitle, { color: colors.text }]}>
                    List Item
                </Text>
                <Text style={[s.pageSubtitle, { color: colors.textSecondary }]}>
                    All variants & configurations
                </Text>

                {/* 1 — Simple */}
                <Section label='1. Simple'>
                    <AppListItem title='Account' showChevron onPress={() => { }} />
                    <AppListItem title='Privacy' showChevron onPress={() => { }} />
                    <AppListItem
                        title='Help'
                        showChevron
                        onPress={() => { }}
                        showBorder={false}
                    />
                </Section>

                {/* 2 — With subtitle */}
                <Section label='2. With subtitle'>
                    <AppListItem
                        title='Email'
                        subtitle='john@example.com'
                        showChevron
                        onPress={() => { }}
                    />
                    <AppListItem
                        title='Phone'
                        subtitle='+91 98765 43210'
                        showChevron
                        onPress={() => { }}
                        showBorder={false}
                    />
                </Section>

                {/* 3 — With left icon */}
                <Section label='3. With left icon'>
                    <AppListItem
                        title='Notifications'
                        leftElement={
                            <Ionicons
                                name='notifications-outline'
                                size={22}
                                color={colors.primary}
                            />
                        }
                        showChevron
                        onPress={() => { }}
                    />
                    <AppListItem
                        title='Privacy'
                        leftElement={
                            <Ionicons
                                name='lock-closed-outline'
                                size={22}
                                color={colors.primary}
                            />
                        }
                        showChevron
                        onPress={() => { }}
                    />
                    <AppListItem
                        title='Help & Support'
                        leftElement={
                            <Ionicons
                                name='help-circle-outline'
                                size={22}
                                color={colors.primary}
                            />
                        }
                        showChevron
                        onPress={() => { }}
                        showBorder={false}
                    />
                </Section>

                {/* 4 — With switch */}
                <Section label='4. With switch (right element)'>
                    <AppListItem
                        title='Dark Mode'
                        leftElement={
                            <Ionicons
                                name='moon-outline'
                                size={22}
                                color={colors.text}
                            />
                        }
                        rightElement={
                            <Switch
                                value={isDark}
                                onValueChange={setIsDark}
                                trackColor={{
                                    false: colors.border,
                                    true: colors.primary,
                                }}
                            />
                        }
                    />
                    <AppListItem
                        title='Push Notifications'
                        leftElement={
                            <Ionicons
                                name='notifications-outline'
                                size={22}
                                color={colors.text}
                            />
                        }
                        rightElement={
                            <Switch
                                value={notifs}
                                onValueChange={setNotifs}
                                trackColor={{
                                    false: colors.border,
                                    true: colors.primary,
                                }}
                            />
                        }
                        showBorder={false}
                    />
                </Section>

                {/* 5 — With thumbnail */}
                <Section label='5. With thumbnail (food delivery style)'>
                    {[
                        {
                            name: 'Chicken Biryani',
                            desc: 'Aromatic basmati rice with spices',
                            price: '₹280',
                            color: '#F59E0B',
                        },
                        {
                            name: 'Paneer Tikka',
                            desc: 'Grilled cottage cheese with mint chutney',
                            price: '₹220',
                            color: '#EF4444',
                        },
                        {
                            name: 'Veg Biryani',
                            desc: 'Garden fresh vegetables with saffron',
                            price: '₹180',
                            color: '#22C55E',
                        },
                    ].map((item, index, arr) => (
                        <AppListItem
                            key={item.name}
                            title={item.name}
                            subtitle={item.desc}
                            leftElement={
                                <View
                                    style={[
                                        s.thumbnail,
                                        { backgroundColor: item.color + '20' },
                                    ]}
                                >
                                    <Text style={{ fontSize: 24 }}>🍽️</Text>
                                </View>
                            }
                            rightElement={
                                <View
                                    style={[
                                        s.priceBadge,
                                        { backgroundColor: colors.primaryLight },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            s.priceText,
                                            { color: colors.primary },
                                        ]}
                                    >
                                        {item.price}
                                    </Text>
                                </View>
                            }
                            onPress={() => { }}
                            showBorder={index !== arr.length - 1}
                        />
                    ))}
                </Section>

                {/* 6 — Destructive */}
                <Section label='6. Destructive'>
                    <AppListItem
                        title='Delete Account'
                        variant='destructive'
                        leftElement={
                            <Ionicons
                                name='trash-outline'
                                size={22}
                                color={colors.error}
                            />
                        }
                        onPress={() => { }}
                    />
                    <AppListItem
                        title='Logout'
                        variant='destructive'
                        leftElement={
                            <Ionicons
                                name='log-out-outline'
                                size={22}
                                color={colors.error}
                            />
                        }
                        onPress={() => { }}
                        showBorder={false}
                    />
                </Section>

                {/* 7 — Disabled */}
                <Section label='7. Disabled'>
                    <AppListItem
                        title='Billing'
                        subtitle='Coming soon'
                        disabled
                        showChevron
                        showBorder={false}
                    />
                </Section>

            </ScrollView>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    root: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 48,
        gap: 20,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    pageSubtitle: {
        fontSize: 14,
        marginTop: 2,
        marginBottom: 8,
    },
    section: {
        gap: 8,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    card: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E2E8F0',
    },
    thumbnail: {
        width: 48,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    priceText: {
        fontSize: 13,
        fontWeight: '700',
    },
})