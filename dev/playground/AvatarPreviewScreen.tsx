import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@ui/Text/AppText'
import { AppAvatar } from '@ui/Avatar/AppAvatar'
import { AppBadge } from '@ui/Badge/AppBadge'
import type { AvatarPresence, AvatarSize, AvatarVariant } from '@ui/Avatar/types'

const SIZES: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl']
const VARIANTS: AvatarVariant[] = ['circle', 'rounded', 'square']
const PRESENCE: AvatarPresence[] = ['online', 'offline', 'away', 'busy']

const SAMPLE_IMAGE = { uri: 'https://picsum.photos/seed/face1/200/200' }

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

const AvatarPreviewScreen = () => {
    const { colors, spacing } = useTheme()

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl * 2 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Sizes */}
            <SectionLabel>Sizes · Image</SectionLabel>
            <View style={s.row}>
                {SIZES.map(size => (
                    <View key={size} style={s.cell}>
                        <AppAvatar source={SAMPLE_IMAGE} size={size} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 6 }}>{size}</AppText>
                    </View>
                ))}
            </View>

            {/* Variants */}
            <SectionLabel>Variants</SectionLabel>
            <View style={s.row}>
                {VARIANTS.map(variant => (
                    <View key={variant} style={s.cell}>
                        <AppAvatar source={SAMPLE_IMAGE} size="lg" variant={variant} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 6 }}>{variant}</AppText>
                    </View>
                ))}
            </View>

            {/* Initials fallback */}
            <SectionLabel>Initials Fallback</SectionLabel>
            <View style={s.row}>
                {['JE', 'AR', 'MR', 'SK', 'PL'].map(initials => (
                    <View key={initials} style={s.cell}>
                        <AppAvatar initials={initials} size="md" />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 6 }}>{initials}</AppText>
                    </View>
                ))}
            </View>

            {/* Placeholder fallback */}
            <SectionLabel>Placeholder Fallback</SectionLabel>
            <View style={s.row}>
                {VARIANTS.map(variant => (
                    <View key={variant} style={s.cell}>
                        <AppAvatar size="md" variant={variant} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 6 }}>{variant}</AppText>
                    </View>
                ))}
            </View>

            {/* Presence indicators */}
            <SectionLabel>Presence Indicators</SectionLabel>
            <View style={s.row}>
                {PRESENCE.map(presence => (
                    <View key={presence} style={s.cell}>
                        <AppAvatar source={SAMPLE_IMAGE} size="lg" presence={presence} />
                        <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 6 }}>{presence}</AppText>
                    </View>
                ))}
            </View>

            {/* Badge slot */}
            <SectionLabel>Badge Slot</SectionLabel>
            <View style={s.row}>
                <View style={s.cell}>
                    <AppAvatar
                        source={SAMPLE_IMAGE}
                        size="lg"
                        badge={<AppBadge label="Pro" size="sm" color="primary" />}
                    />
                    <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 6 }}>Pro</AppText>
                </View>
                <View style={s.cell}>
                    <AppAvatar
                        initials="AR"
                        size="lg"
                        badge={<AppBadge label="New" size="sm" color="success" />}
                    />
                    <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 6 }}>New</AppText>
                </View>
                <View style={s.cell}>
                    <AppAvatar
                        source={SAMPLE_IMAGE}
                        size="lg"
                        badge={<AppBadge label="5" size="sm" color="error" />}
                    />
                    <AppText style={{ color: colors.textSecondary, fontSize: 11, marginTop: 6 }}>Count</AppText>
                </View>
            </View>

            {/* Avatar group */}
            <SectionLabel>Avatar Group</SectionLabel>
            <View style={s.avatarGroup}>
                {[
                    { uri: 'https://picsum.photos/seed/face1/200/200' },
                    { uri: 'https://picsum.photos/seed/face2/200/200' },
                    { uri: 'https://picsum.photos/seed/face3/200/200' },
                    { uri: 'https://picsum.photos/seed/face4/200/200' },
                ].map((src, i) => (
                    <View key={i} style={{ marginLeft: i === 0 ? 0 : -12, zIndex: 10 - i }}>
                        <AppAvatar
                            source={src}
                            size="md"
                            style={{ borderWidth: 2, borderColor: colors.background }}
                        />
                    </View>
                ))}
                <View style={{ marginLeft: -12, zIndex: 0 }}>
                    <AppAvatar initials="+8" size="md" style={{ borderWidth: 2, borderColor: colors.background }} />
                </View>
            </View>

            {/* Real-world · Chat list */}
            <SectionLabel>Real-world · Chat List</SectionLabel>
            {[
                { name: 'Ariana Clarke', message: 'Sounds good, see you then!', time: '2m', presence: 'online' as AvatarPresence, src: { uri: 'https://picsum.photos/seed/face1/200/200' } },
                { name: 'Marcus Reid', message: 'Can you review the PR?', time: '1h', presence: 'away' as AvatarPresence, src: { uri: 'https://picsum.photos/seed/face2/200/200' } },
                { name: 'Sophie Nguyen', message: 'Just sent the files over.', time: '3h', presence: 'busy' as AvatarPresence, src: { uri: 'https://picsum.photos/seed/face3/200/200' } },
            ].map(item => (
                <View key={item.name} style={[s.chatRow, { borderBottomColor: colors.border }]}>
                    <AppAvatar source={item.src} size="md" presence={item.presence} />
                    <View style={{ flex: 1, marginLeft: spacing.md }}>
                        <View style={s.chatMeta}>
                            <AppText style={{ color: colors.text, fontWeight: '600', fontSize: 14 }}>{item.name}</AppText>
                            <AppText style={{ color: colors.textSecondary, fontSize: 12 }}>{item.time}</AppText>
                        </View>
                        <AppText style={{ color: colors.textSecondary, fontSize: 13, marginTop: 2 }} numberOfLines={1}>
                            {item.message}
                        </AppText>
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}

export default AvatarPreviewScreen

const s = StyleSheet.create({
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' },
    cell: { alignItems: 'center' },
    avatarGroup: { flexDirection: 'row', alignItems: 'center' },
    chatRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth },
    chatMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
})