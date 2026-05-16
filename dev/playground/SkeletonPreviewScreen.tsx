import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@ui/Text/AppText'
import { AppSkeleton } from '@ui/Skeleton/AppSkeleton'
import { AppAvatar } from '@ui/Avatar/AppAvatar'

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

const SkeletonPreviewScreen = () => {
    const { colors, spacing } = useTheme()
    const [loaded, setLoaded] = useState(false)

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl * 2 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Toggle to simulate load */}
            <TouchableOpacity
                onPress={() => setLoaded(l => !l)}
                style={[s.toggleBtn, { backgroundColor: colors.primary, borderRadius: 10 }]}
                activeOpacity={0.8}
            >
                <AppText style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>
                    {loaded ? 'Show Skeleton' : 'Show Content'}
                </AppText>
            </TouchableOpacity>

            {/* Rect */}
            <SectionLabel>Rect</SectionLabel>
            <AppSkeleton variant="rect" height={160} />

            {/* Circle */}
            <SectionLabel>Circle</SectionLabel>
            <View style={s.row}>
                {[32, 48, 64, 88].map(size => (
                    <AppSkeleton key={size} variant="circle" width={size} />
                ))}
            </View>

            {/* Text lines */}
            <SectionLabel>Text · 3 lines</SectionLabel>
            <AppSkeleton variant="text" lines={3} />

            <SectionLabel>Text · 5 lines</SectionLabel>
            <AppSkeleton variant="text" lines={5} />

            {/* ── Real-world compositions ── */}

            {/* Profile card skeleton */}
            <SectionLabel>Profile Card Skeleton</SectionLabel>
            {loaded ? (
                <View style={[s.card, { backgroundColor: colors.surface }]}>
                    <AppAvatar source={{ uri: 'https://picsum.photos/seed/face1/200/200' }} size="lg" />
                    <View style={{ marginLeft: spacing.md, flex: 1 }}>
                        <AppText style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>Ariana Clarke</AppText>
                        <AppText style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>@arianaclarke</AppText>
                        <AppText style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4 }}>UI Designer based in NYC.</AppText>
                    </View>
                </View>
            ) : (
                <View style={[s.card, { backgroundColor: colors.surface }]}>
                    <AppSkeleton variant="circle" width={64} />
                    <View style={{ marginLeft: spacing.md, flex: 1, gap: 8 }}>
                        <AppSkeleton variant="rect" width="50%" height={14} radius={4} />
                        <AppSkeleton variant="rect" width="35%" height={12} radius={4} />
                        <AppSkeleton variant="text" lines={2} />
                    </View>
                </View>
            )}

            {/* Feed card skeleton */}
            <SectionLabel>Feed Card Skeleton</SectionLabel>
            {loaded ? (
                <View style={[s.feedCard, { backgroundColor: colors.surface }]}>
                    <View style={[s.feedImage, { backgroundColor: colors.surfaceAlt, justifyContent: 'center', alignItems: 'center' }]}>
                        <AppText style={{ fontSize: 32 }}>🌅</AppText>
                    </View>
                    <View style={{ padding: spacing.md }}>
                        <AppText style={{ fontWeight: '700', fontSize: 16, color: colors.text }}>Hidden Gems of Southeast Asia</AppText>
                        <AppText style={{ color: colors.textSecondary, fontSize: 13, marginTop: 6, lineHeight: 20 }}>
                            From rice fields to lantern-lit streets, discover the places most guides miss.
                        </AppText>
                    </View>
                </View>
            ) : (
                <View style={[s.feedCard, { backgroundColor: colors.surface }]}>
                    <AppSkeleton variant="rect" height={180} radius={0} />
                    <View style={{ padding: spacing.md, gap: 8 }}>
                        <AppSkeleton variant="rect" width="70%" height={16} radius={4} />
                        <AppSkeleton variant="text" lines={3} />
                    </View>
                </View>
            )}

            {/* Chat list skeleton */}
            <SectionLabel>Chat List Skeleton</SectionLabel>
            {[1, 2, 3].map(i => (
                loaded ? (
                    <View key={i} style={[s.chatRow, { borderBottomColor: colors.border }]}>
                        <AppAvatar source={{ uri: `https://picsum.photos/seed/face${i}/200/200` }} size="md" />
                        <View style={{ flex: 1, marginLeft: spacing.md }}>
                            <AppText style={{ fontWeight: '600', fontSize: 14, color: colors.text }}>User {i}</AppText>
                            <AppText style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }}>Last message preview here...</AppText>
                        </View>
                    </View>
                ) : (
                    <View key={i} style={[s.chatRow, { borderBottomColor: colors.border }]}>
                        <AppSkeleton variant="circle" width={48} />
                        <View style={{ flex: 1, marginLeft: spacing.md, gap: 8 }}>
                            <AppSkeleton variant="rect" width="40%" height={13} radius={4} />
                            <AppSkeleton variant="rect" width="70%" height={12} radius={4} />
                        </View>
                    </View>
                )
            ))}
        </ScrollView>
    )
}

export default SkeletonPreviewScreen

const s = StyleSheet.create({
    toggleBtn: { paddingVertical: 12, alignItems: 'center', marginBottom: 4 },
    row: { flexDirection: 'row', gap: 16, alignItems: 'flex-end' },
    card: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16 },
    feedCard: { borderRadius: 16, overflow: 'hidden' },
    feedImage: { height: 180 },
    chatRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
})