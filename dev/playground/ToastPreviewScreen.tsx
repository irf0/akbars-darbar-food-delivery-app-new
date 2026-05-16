import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@ui/Text/AppText'
import { toast } from '@ui/Toast/toastStore'
import type { ToastType } from '@ui/Toast'

const TYPES: { type: ToastType; label: string; emoji: string }[] = [
    { type: 'success', label: 'Success', emoji: '✅' },
    { type: 'error', label: 'Error', emoji: '❌' },
    { type: 'warning', label: 'Warning', emoji: '⚠️' },
    { type: 'info', label: 'Info', emoji: 'ℹ️' },
    { type: 'neutral', label: 'Neutral', emoji: '💬' },
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

const TriggerBtn = ({
    label,
    onPress,
    color,
}: {
    label: string
    onPress: () => void
    color?: string
}) => {
    const { colors, spacing, radius } = useTheme()
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                s.btn,
                {
                    backgroundColor: color ?? colors.surfaceAlt,
                    borderRadius: radius.md,
                    paddingVertical: spacing.sm,
                    paddingHorizontal: spacing.md,
                },
            ]}
        >
            <AppText style={{ fontSize: 13, fontWeight: '600', color: color ? '#fff' : colors.text }}>
                {label}
            </AppText>
        </TouchableOpacity>
    )
}

const ToastPreviewScreen = () => {
    const { colors, spacing } = useTheme()

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl * 2 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Types */}
            <SectionLabel>Types · Top</SectionLabel>
            <View style={s.row}>
                {TYPES.map(({ type, label, emoji }) => (
                    <TriggerBtn
                        key={type}
                        label={`${emoji} ${label}`}
                        onPress={() => toast.show({
                            type,
                            title: `${label} toast`,
                            subtitle: 'This is a subtitle message.',
                            position: 'top',
                        })}
                    />
                ))}
            </View>

            {/* Bottom position */}
            <SectionLabel>Position · Bottom</SectionLabel>
            <View style={s.row}>
                {TYPES.map(({ type, label }) => (
                    <TriggerBtn
                        key={type}
                        label={label}
                        onPress={() => toast.show({
                            type,
                            title: `${label} from bottom`,
                            position: 'bottom',
                        })}
                    />
                ))}
            </View>

            {/* With subtitle */}
            <SectionLabel>With Subtitle</SectionLabel>
            <TriggerBtn
                label="Show with subtitle"
                onPress={() => toast.success(
                    'Profile updated',
                    'Your changes have been saved successfully.',
                )}
            />

            {/* With action */}
            <SectionLabel>With Action Button</SectionLabel>
            <TriggerBtn
                label="Show with action"
                onPress={() => toast.show({
                    type: 'neutral',
                    title: 'Message deleted',
                    subtitle: 'This action cannot be undone.',
                    action: { label: 'Undo', onPress: () => { } },
                })}
            />

            {/* Persist */}
            <SectionLabel>Persistent (no auto-dismiss)</SectionLabel>
            <TriggerBtn
                label="Show persistent"
                onPress={() => toast.show({
                    type: 'warning',
                    title: 'Session expiring',
                    subtitle: 'Your session will expire in 5 minutes.',
                    duration: 0,
                })}
            />

            {/* Real-world shortcuts */}
            <SectionLabel>Real-world Shortcuts</SectionLabel>
            <View style={s.col}>
                <TriggerBtn label="✅ Payment successful" color="#22C55E" onPress={() => toast.success('Payment successful', '$49.99 charged to your card.')} />
                <TriggerBtn label="❌ Upload failed" color="#EF4444" onPress={() => toast.error('Upload failed', 'File size exceeds the 10MB limit.')} />
                <TriggerBtn label="⚠️ Low storage" color="#F59E0B" onPress={() => toast.warning('Low storage', 'You have less than 500MB remaining.')} />
                <TriggerBtn label="ℹ️ New version available" color="#3B82F6" onPress={() => toast.info('New version available', 'Update to v2.1 for the latest features.')} />
            </View>
        </ScrollView>
    )
}

export default ToastPreviewScreen

const s = StyleSheet.create({
    row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    col: { gap: 8 },
    btn: {},
})