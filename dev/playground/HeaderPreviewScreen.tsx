import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppHeader } from '@components/ui/Header/AppHeader';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const noop = () => { };

const icon = (name: React.ComponentProps<typeof Ionicons>['name'], color = '#111827', size = 22) => (
    <Ionicons name={name} size={size} color={color} />
);

// ─── Section wrapper ──────────────────────────────────────────────────────────

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => (
    <View style={s.section}>
        <Text style={s.sectionLabel}>{label}</Text>
        <View style={s.card}>{children}</View>
    </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────

const HeaderPreviewScreen = () => {
    const [notifCount, setNotifCount] = useState(3);

    return (
        <SafeAreaView style={s.root}>
            <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

                <Text style={s.pageTitle}>Header Component</Text>
                <Text style={s.pageSubtitle}>All variants & configurations</Text>

                {/* 1 ── Default */}
                <Section label="1. Default — centered title">
                    <AppHeader title="Home" />
                </Section>

                {/* 2 ── Back navigation */}
                <Section label="2. Back navigation">
                    <AppHeader
                        title="Profile"
                        leftAction={{ icon: icon('arrow-back'), onPress: noop, accessibilityLabel: 'Go back' }}
                    />
                </Section>

                {/* 3 ── Back + right action */}
                <Section label="3. Back + single right action">
                    <AppHeader
                        title="Notifications"
                        leftAction={{ icon: icon('arrow-back'), onPress: noop }}
                        rightActions={[{ icon: icon('ellipsis-horizontal'), onPress: noop }]}
                    />
                </Section>

                {/* 4 ── Multiple right actions + numeric badge */}
                <Section label="4. Multiple right actions + badge">
                    <AppHeader
                        title="Feed"
                        leftAction={{ icon: icon('menu'), onPress: noop }}
                        rightActions={[
                            { icon: icon('search'), onPress: noop },
                            {
                                icon: icon('notifications'),
                                onPress: () => setNotifCount(0),
                                badge: notifCount,
                            },
                        ]}
                    />
                </Section>

                {/* 5 ── Left-aligned title */}
                <Section label="5. Left-aligned title">
                    <AppHeader
                        title="Messages"
                        titleAlign="left"
                        leftAction={{ icon: icon('menu'), onPress: noop }}
                        rightActions={[{ icon: icon('create-outline'), onPress: noop }]}
                    />
                </Section>

                {/* 6 ── Title + subtitle */}
                <Section label="6. Title + subtitle">
                    <AppHeader
                        title="Jane Smith"
                        subtitle="Active now"
                        leftAction={{ icon: icon('arrow-back'), onPress: noop }}
                        rightActions={[{ icon: icon('call-outline'), onPress: noop }]}
                    />
                </Section>

                {/* 7 ── Elevated variant */}
                <Section label="7. Elevated variant">
                    <AppHeader
                        title="Dashboard"
                        variant="elevated"
                        rightActions={[{ icon: icon('notifications'), onPress: noop, badge: true }]}
                    />
                </Section>

                {/* 8 ── Colored variant */}
                <Section label="8. Colored variant">
                    <AppHeader
                        title="My App"
                        variant="colored"
                        backgroundColor="#6366F1"
                        leftAction={{ icon: icon('menu', '#fff'), onPress: noop }}
                        rightActions={[{ icon: icon('search', '#fff'), onPress: noop }]}
                    />
                </Section>

                {/* 9 ── Transparent variant */}
                <Section label="9. Transparent variant (dark bg to show)">
                    <View style={{ backgroundColor: '#1E293B', borderRadius: 12, overflow: 'hidden' }}>
                        <AppHeader
                            variant="transparent"
                            leftAction={{ icon: icon('arrow-back', '#fff'), onPress: noop }}
                            rightActions={[{ icon: icon('share-outline', '#fff'), onPress: noop }]}
                        />
                    </View>
                </Section>

                {/* 10 ── Modal header */}
                <Section label="10. Modal header (close + text action)">
                    <AppHeader
                        title="Add Address"
                        showBorder
                        leftAction={{ icon: icon('close'), onPress: noop }}
                        rightActions={[
                            {
                                icon: <Text style={{ fontSize: 15, fontWeight: '600', color: '#6366F1' }}>Save</Text>,
                                onPress: noop,
                            },
                        ]}
                    />
                </Section>

                {/* 11 ── Custom title component */}
                <Section label="11. Custom title component">
                    <AppHeader
                        titleComponent={
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#6366F1', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>K</Text>
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: '800', letterSpacing: -0.5 }}>KitApp</Text>
                            </View>
                        }
                        rightActions={[{ icon: icon('notifications-outline'), onPress: noop }]}
                    />
                </Section>

                {/* 12 ── Disabled action */}
                <Section label="12. Disabled action">
                    <AppHeader
                        title="Settings"
                        leftAction={{ icon: icon('arrow-back'), onPress: noop }}
                        rightActions={[
                            { icon: icon('checkmark'), onPress: noop, disabled: true },
                        ]}
                    />
                </Section>

                {/* 13 ── Three right actions */}
                <Section label="13. Max 3 right actions">
                    <AppHeader
                        title="Gallery"
                        leftAction={{ icon: icon('arrow-back'), onPress: noop }}
                        rightActions={[
                            { icon: icon('search'), onPress: noop },
                            { icon: icon('share-outline'), onPress: noop },
                            { icon: icon('ellipsis-vertical'), onPress: noop },
                        ]}
                    />
                </Section>

                {/* 14 ── Show border */}
                <Section label="14. With bottom border">
                    <AppHeader
                        title="Account"
                        showBorder
                        leftAction={{ icon: icon('arrow-back'), onPress: noop }}
                    />
                </Section>

            </ScrollView>
        </SafeAreaView>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
        color: '#0F172A',
        letterSpacing: -0.5,
    },
    pageSubtitle: {
        fontSize: 14,
        color: '#64748B',
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
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E2E8F0',
    },
});

export default HeaderPreviewScreen;