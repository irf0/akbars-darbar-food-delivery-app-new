import React, { useEffect, useRef } from 'react'
import {
    Animated,
    Easing,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { useTheme } from '@hooks/useTheme'
import {
    TOAST_ANIMATION_DURATION,
    TOAST_COLOR_MAP,
    TOAST_DEFAULTS,
} from './constants'
import { toastStyles as s } from './styles'
import { useToastStore } from './toastStore'
import type { ToastProps } from './types'

// ─── Single Toast ─────────────────────────────────────────────────────────────

export const AppToast: React.FC<ToastProps> = ({
    id,
    type = TOAST_DEFAULTS.type,
    title,
    subtitle,
    duration = TOAST_DEFAULTS.duration,
    position = TOAST_DEFAULTS.position,
    action,
    onHide,
}) => {
    const { fontFamily } = useTheme()
    const colors = TOAST_COLOR_MAP[type]

    const translateY = useRef(new Animated.Value(position === 'top' ? -80 : 80)).current
    const opacity = useRef(new Animated.Value(0)).current

    // Slide in
    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: TOAST_ANIMATION_DURATION,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: TOAST_ANIMATION_DURATION,
                useNativeDriver: true,
            }),
        ]).start()
    }, [])

    // Auto-dismiss
    useEffect(() => {
        if (!duration) return
        const timer = setTimeout(dismiss, duration)
        return () => clearTimeout(timer)
    }, [duration])

    const dismiss = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: position === 'top' ? -80 : 80,
                duration: TOAST_ANIMATION_DURATION,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: TOAST_ANIMATION_DURATION,
                useNativeDriver: true,
            }),
        ]).start(onHide)
    }

    return (
        <Animated.View style={{ transform: [{ translateY }], opacity, marginBottom: 8 }}>
            <View style={[s.toast, { backgroundColor: colors.bg, borderLeftColor: colors.border }]}>
                {/* Icon */}
                <View style={[s.iconCircle, { backgroundColor: colors.border + '25' }]}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: colors.text }}>
                        {colors.icon}
                    </Text>
                </View>

                {/* Text */}
                <View style={s.textCol}>
                    <Text style={[s.title, { fontFamily: fontFamily.semibold, color: colors.text }]}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={[s.subtitle, { fontFamily: fontFamily.regular, color: colors.text }]}>
                            {subtitle}
                        </Text>
                    )}
                </View>

                {/* Action */}
                {action && (
                    <TouchableOpacity
                        onPress={() => { action.onPress(); dismiss() }}
                        style={[s.actionBtn, { borderColor: colors.border }]}
                        activeOpacity={0.7}
                    >
                        <Text style={[s.actionText, { color: colors.text, fontFamily: fontFamily.semibold }]}>
                            {action.label}
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Dismiss */}
                <TouchableOpacity onPress={dismiss} style={s.dismissBtn} activeOpacity={0.7}>
                    <Text style={{ fontSize: 14, color: colors.text, opacity: 0.5, fontWeight: '700' }}>✕</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

// ─── ToastProvider ────────────────────────────────────────────────────────────
// Mount this once at the root of your app, above the navigator.

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { toasts, hide } = useToastStore()

    const topToasts = toasts.filter(t => (t.position ?? 'top') === 'top')
    const bottomToasts = toasts.filter(t => t.position === 'bottom')

    return (
        <View style={{ flex: 1 }}>
            {children}

            {/* Top toasts */}
            {topToasts.length > 0 && (
                <View style={[s.container, s.topPosition]} pointerEvents="box-none">
                    {topToasts.map(t => (
                        <AppToast
                            key={t.id}
                            {...t}
                            onHide={() => hide(t.id!)}
                        />
                    ))}
                </View>
            )}

            {/* Bottom toasts */}
            {bottomToasts.length > 0 && (
                <View style={[s.container, s.bottomPosition]} pointerEvents="box-none">
                    {bottomToasts.map(t => (
                        <AppToast
                            key={t.id}
                            {...t}
                            onHide={() => hide(t.id!)}
                        />
                    ))}
                </View>
            )}
        </View>
    )
}

