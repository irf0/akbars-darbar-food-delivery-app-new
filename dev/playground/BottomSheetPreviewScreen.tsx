import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { AppBottomSheet } from '@components/ui/BottomSheet'
import { AppText } from '@components/ui/Text/AppText'
import { useTheme } from '@hooks/useTheme'

type SheetDemo = {
    label: string
    snapPoints: (string | number)[]
    title?: string
    showHandle?: boolean
    showBackdrop?: boolean
}

const DEMOS: SheetDemo[] = [
    {
        label: 'Quarter sheet (25%)',
        snapPoints: ['25%'],
        title: 'Quick Action',
        showHandle: true,
        showBackdrop: true,
    },
    {
        label: 'Half sheet (50%)',
        snapPoints: ['50%'],
        title: 'Half Sheet',
        showHandle: true,
        showBackdrop: true,
    },
    {
        label: 'Full sheet (90%)',
        snapPoints: ['90%'],
        title: 'Full Sheet',
        showHandle: true,
        showBackdrop: true,
    },
    {
        label: 'Multi snap (25% → 50% → 90%)',
        snapPoints: ['25%', '50%', '90%'],
        title: 'Multi Snap',
        showHandle: true,
        showBackdrop: true,
    },
    {
        label: 'No backdrop',
        snapPoints: ['40%'],
        title: 'No Backdrop',
        showHandle: true,
        showBackdrop: false,
    },
    {
        label: 'No handle, no title',
        snapPoints: ['35%'],
        showHandle: false,
        showBackdrop: true,
    },
]

export default function BottomSheetPreviewScreen() {
    const { colors, spacing } = useTheme()
    const [activeDemo, setActiveDemo] = useState<SheetDemo | null>(null)

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView contentContainerStyle={{ padding: spacing.md, gap: 12 }}>
                <AppText variant='h3' weight='semibold'>
                    Bottom Sheet
                </AppText>
                <AppText variant='body' color='textSecondary'>
                    Tap any demo to preview
                </AppText>

                {DEMOS.map((demo, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setActiveDemo(demo)}
                        style={[
                            styles.demoButton,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                padding: spacing.md,
                            },
                        ]}
                        activeOpacity={0.7}
                    >
                        <AppText variant='body' weight='medium'>
                            {demo.label}
                        </AppText>
                        <AppText variant='caption' color='textSecondary'>
                            snapPoints: {JSON.stringify(demo.snapPoints)}
                        </AppText>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Bottom Sheet */}
            <AppBottomSheet
                isOpen={!!activeDemo}
                onClose={() => setActiveDemo(null)}
                snapPoints={activeDemo?.snapPoints ?? ['50%']}
                title={activeDemo?.title}
                showHandle={activeDemo?.showHandle}
                showBackdrop={activeDemo?.showBackdrop}
            >
                <AppText variant='body' color='textSecondary'>
                    Snap points: {JSON.stringify(activeDemo?.snapPoints)}
                </AppText>
                <AppText variant='body' color='textSecondary'>
                    Handle: {activeDemo?.showHandle ? 'visible' : 'hidden'}
                </AppText>
                <AppText variant='body' color='textSecondary'>
                    Backdrop: {activeDemo?.showBackdrop ? 'enabled' : 'disabled'}
                </AppText>
            </AppBottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    demoButton: {
        borderRadius: 12,
        borderWidth: 1,
        gap: 4,
    },
})