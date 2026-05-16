import React, { useEffect, useRef } from 'react'
import {
    Animated,
    Easing,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { useTheme } from '@hooks/useTheme'
import {
    ACTION_COLORS,
    MODAL_ANIMATION_DURATION,
    MODAL_DEFAULTS,
} from './constants'
import { createModalStyles } from './styles'
import type { ModalAction, ModalProps } from './types'

// ─── Action Button ────────────────────────────────────────────────────────────

const ActionBtn = ({
    action,
    styles,
    fontFamily,
}: {
    action: ModalAction
    styles: ReturnType<typeof createModalStyles>
    fontFamily: any
}) => {
    const variant = action.variant ?? 'primary'
    const colors = ACTION_COLORS[variant]

    return (
        <TouchableOpacity
            onPress={action.onPress}
            disabled={action.disabled || action.loading}
            activeOpacity={0.8}
            style={[
                styles.actionBtn,
                {
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                    opacity: action.disabled ? 0.5 : 1,
                },
            ]}
        >
            <Text style={{ fontSize: 15, fontFamily: fontFamily.semibold, color: colors.text }}>
                {action.loading ? 'Loading...' : action.label}
            </Text>
        </TouchableOpacity>
    )
}

// ─── AppModal ─────────────────────────────────────────────────────────────────

export const AppModal: React.FC<ModalProps> = ({
    visible,
    onClose,
    title,
    subtitle,
    size = MODAL_DEFAULTS.size,
    closeOnBackdrop = MODAL_DEFAULTS.closeOnBackdrop,
    showCloseBtn = MODAL_DEFAULTS.showCloseBtn,
    primaryAction,
    secondaryAction,
    children,
    style,
}) => {
    const { colors, fontFamily, fontWeight } = useTheme()
    const styles = createModalStyles(colors, size)

    const scale = useRef(new Animated.Value(0.92)).current
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: MODAL_ANIMATION_DURATION,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    tension: 160,
                    friction: 12,
                    useNativeDriver: true,
                }),
            ]).start()
        } else {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: MODAL_ANIMATION_DURATION,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 0.92,
                    duration: MODAL_ANIMATION_DURATION,
                    useNativeDriver: true,
                }),
            ]).start()
        }
    }, [visible])

    const hasHeader = title || showCloseBtn
    const hasFooter = primaryAction || secondaryAction
    const hasContent = !!children

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            {/* Backdrop */}
            <TouchableWithoutFeedback onPress={closeOnBackdrop ? onClose : undefined}>
                <Animated.View style={[styles.overlay, { opacity }]}>
                    {/* Stop tap propagation on the card itself */}
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.container,
                                { transform: [{ scale }] },
                                style,
                            ]}
                        >
                            {/* Header */}
                            {hasHeader && (
                                <View style={styles.header}>
                                    <View style={styles.headerText}>
                                        {title && (
                                            <Text style={[styles.title, { fontFamily: fontFamily.bold, fontWeight: fontWeight.bold as any }]}>
                                                {title}
                                            </Text>
                                        )}
                                        {subtitle && (
                                            <Text style={[styles.subtitle, { fontFamily: fontFamily.regular }]}>
                                                {subtitle}
                                            </Text>
                                        )}
                                    </View>
                                    {showCloseBtn && (
                                        <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
                                            <Text style={{ fontSize: 14, color: colors.textSecondary, fontWeight: '700' }}>✕</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}

                            {/* Divider between header and body */}
                            {hasHeader && hasContent && <View style={styles.divider} />}

                            {/* Body */}
                            {hasContent && (
                                <ScrollView
                                    style={styles.body}
                                    showsVerticalScrollIndicator={false}
                                    bounces={false}
                                >
                                    {children}
                                </ScrollView>
                            )}

                            {/* Footer */}
                            {hasFooter && (
                                <>
                                    <View style={styles.divider} />
                                    <View style={styles.footer}>
                                        {primaryAction && (
                                            <ActionBtn action={primaryAction} styles={styles} fontFamily={fontFamily} />
                                        )}
                                        {secondaryAction && (
                                            <ActionBtn action={{ ...secondaryAction, variant: secondaryAction.variant ?? 'outline' }} styles={styles} fontFamily={fontFamily} />
                                        )}
                                    </View>
                                </>
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default AppModal