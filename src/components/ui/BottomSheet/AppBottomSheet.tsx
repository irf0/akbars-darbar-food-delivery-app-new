import React, { useCallback, useEffect, useRef } from 'react'
import { View, TouchableOpacity } from 'react-native'
import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'
import { AppText } from '@components/ui/Text/AppText'
import { AppBottomSheetProps } from './types'
import { createStyles } from './styles'
import { DEFAULT_SNAP_POINTS, DEFAULT_SNAP_INDEX } from './constants'

export const AppBottomSheet = ({
    isOpen,
    onClose,
    children,
    snapPoints = DEFAULT_SNAP_POINTS,
    title,
    showHandle = true,
    showBackdrop = true,
    enablePanDownToClose = true,
}: AppBottomSheetProps) => {
    const { colors, spacing } = useTheme()
    const styles = createStyles(colors, spacing)
    const bottomSheetRef = useRef<BottomSheet>(null)

    // ─── Open/close based on isOpen prop ──────────────────────────────
    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current?.snapToIndex(DEFAULT_SNAP_INDEX)
        } else {
            bottomSheetRef.current?.close()
        }
    }, [isOpen])

    // ─── Backdrop ─────────────────────────────────────────────────────
    const renderBackdrop = useCallback(
        (props: any) =>
            showBackdrop ? (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    onPress={onClose}
                />
            ) : null,
        [showBackdrop, onClose]
    )

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={enablePanDownToClose}
            onClose={onClose}
            backdropComponent={renderBackdrop}
            handleIndicatorStyle={{
                backgroundColor: showHandle ? colors.border : 'transparent',
            }}
            backgroundStyle={{
                backgroundColor: colors.surface,
            }}
        >
            <BottomSheetView style={styles.container}>
                {/* Header */}
                {title && (
                    <View style={styles.header}>
                        <AppText
                            variant='h4'
                            weight='semibold'
                            style={styles.title}
                        >
                            {title}
                        </AppText>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Ionicons
                                name='close'
                                size={24}
                                color={colors.text}
                            />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Content */}
                <View style={styles.content}>
                    {children}
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}