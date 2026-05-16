import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@ui/Text/AppText'
import { AppModal } from '@ui/Modal/AppModal'
import { AppDivider } from '@ui/Divider/AppDivider'
import { toast } from '@ui/Toast'
import type { ModalSize } from '@ui/Modal'

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

const TriggerBtn = ({ label, onPress }: { label: string; onPress: () => void }) => {
    const { colors, spacing, radius } = useTheme()
    return (
        <View
            style={[s.btn, { backgroundColor: colors.surfaceAlt, borderRadius: radius.md }]}
        >
            <Text
                onPress={onPress}
                style={{ color: colors.text, fontWeight: '600', fontSize: 14, paddingVertical: spacing.sm, paddingHorizontal: spacing.md }}
            >
                {label}
            </Text>
        </View>
    )
}

const ModalPreviewScreen = () => {
    const { colors, spacing } = useTheme()

    const [activeModal, setActiveModal] = useState<string | null>(null)
    const open = (id: string) => setActiveModal(id)
    const close = () => setActiveModal(null)

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl * 2 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Sizes */}
            <SectionLabel>Sizes</SectionLabel>
            <View style={s.col}>
                {(['sm', 'md', 'lg'] as ModalSize[]).map(size => (
                    <TriggerBtn key={size} label={`Open ${size.toUpperCase()} modal`} onPress={() => open(size)} />
                ))}
            </View>

            {/* Confirm / Destructive */}
            <SectionLabel>Confirm Dialog</SectionLabel>
            <TriggerBtn label="Delete account" onPress={() => open('delete')} />

            {/* Info only */}
            <SectionLabel>Info · No actions</SectionLabel>
            <TriggerBtn label="Open info modal" onPress={() => open('info')} />

            {/* Custom content */}
            <SectionLabel>Custom Content</SectionLabel>
            <TriggerBtn label="Open with custom body" onPress={() => open('custom')} />

            {/* No backdrop dismiss */}
            <SectionLabel>No Backdrop Dismiss</SectionLabel>
            <TriggerBtn label="Open persistent modal" onPress={() => open('persistent')} />

            {/* ── Modals ── */}

            {/* SM */}
            <AppModal
                visible={activeModal === 'sm'}
                onClose={close}
                title="Small Modal"
                subtitle="Compact size — great for quick confirmations."
                size="sm"
                primaryAction={{ label: 'Got it', onPress: close }}
            />

            {/* MD */}
            <AppModal
                visible={activeModal === 'md'}
                onClose={close}
                title="Medium Modal"
                subtitle="Default size — works for most use cases."
                size="md"
                primaryAction={{ label: 'Confirm', onPress: () => { close(); toast.success('Confirmed!') } }}
                secondaryAction={{ label: 'Cancel', onPress: close, variant: 'outline' }}
            />

            {/* LG */}
            <AppModal
                visible={activeModal === 'lg'}
                onClose={close}
                title="Large Modal"
                subtitle="More room for content-heavy scenarios."
                size="lg"
                primaryAction={{ label: 'Save Changes', onPress: () => { close(); toast.success('Changes saved') } }}
                secondaryAction={{ label: 'Discard', onPress: close, variant: 'ghost' }}
            >
                <AppText style={{ color: colors.textSecondary, lineHeight: 22 }}>
                    This modal has a scrollable body area. You can put forms, lists, or any custom content here. The footer with action buttons stays pinned at the bottom.
                </AppText>
            </AppModal>

            {/* Delete — destructive */}
            <AppModal
                visible={activeModal === 'delete'}
                onClose={close}
                title="Delete account?"
                subtitle="This will permanently delete your account and all associated data. This action cannot be undone."
                size="sm"
                primaryAction={{ label: 'Delete Account', onPress: () => { close(); toast.error('Account deleted') }, variant: 'destructive' }}
                secondaryAction={{ label: 'Cancel', onPress: close, variant: 'outline' }}
            />

            {/* Info */}
            <AppModal
                visible={activeModal === 'info'}
                onClose={close}
                title="About this feature"
                size="md"
            >
                <AppText style={{ color: colors.textSecondary, lineHeight: 22 }}>
                    This is an informational modal with no action buttons. The user can only dismiss it via the close button or tapping the backdrop.
                </AppText>
            </AppModal>

            {/* Custom content */}
            <AppModal
                visible={activeModal === 'custom'}
                onClose={close}
                title="Choose a plan"
                size="md"
                primaryAction={{ label: 'Upgrade to Pro', onPress: () => { close(); toast.success('Welcome to Pro!') } }}
                secondaryAction={{ label: 'Maybe later', onPress: close, variant: 'ghost' }}
            >
                <View style={{ gap: 12 }}>
                    {[
                        { label: 'Free', price: '$0/mo', features: ['5 projects', '1GB storage', 'Email support'] },
                        { label: 'Pro', price: '$12/mo', features: ['Unlimited projects', '50GB storage', 'Priority support'], highlight: true },
                        { label: 'Teams', price: '$39/mo', features: ['Everything in Pro', 'Team collaboration', 'Admin dashboard'] },
                    ].map(plan => (
                        <View
                            key={plan.label}
                            style={[
                                s.planCard,
                                {
                                    borderColor: plan.highlight ? colors.primary : colors.border,
                                    borderWidth: plan.highlight ? 2 : 1,
                                    borderRadius: 12,
                                    padding: 14,
                                    backgroundColor: plan.highlight ? colors.primary + '0D' : colors.surface,
                                },
                            ]}
                        >
                            <View style={s.planRow}>
                                <AppText style={{ fontWeight: '700', fontSize: 15, color: colors.text }}>{plan.label}</AppText>
                                <AppText style={{ fontWeight: '700', fontSize: 15, color: plan.highlight ? colors.primary : colors.text }}>{plan.price}</AppText>
                            </View>
                            {plan.features.map(f => (
                                <AppText key={f} style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>• {f}</AppText>
                            ))}
                        </View>
                    ))}
                </View>
            </AppModal>

            {/* Persistent */}
            <AppModal
                visible={activeModal === 'persistent'}
                onClose={close}
                title="Complete your profile"
                subtitle="Please fill in your details before continuing."
                size="md"
                closeOnBackdrop={false}
                showCloseBtn={false}
                primaryAction={{ label: 'Complete Profile', onPress: () => { close(); toast.success('Profile completed!') } }}
            />
        </ScrollView>
    )
}

export default ModalPreviewScreen

const s = StyleSheet.create({
    col: { gap: 8 },
    btn: { alignSelf: 'flex-start' },
    planCard: {},
    planRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
})