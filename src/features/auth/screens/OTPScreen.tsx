import React, { useRef, useState } from 'react'
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,
    ActivityIndicator
} from 'react-native'
import { AuthScreenProps } from '@navigation/types'
import { theme } from 'src/theme'
import { useOTP } from '../hooks/useOTP'
import { useOTPTimer } from '../hooks/useOTPTimer'
import { getConfirmation } from '../store/confirmationRef'

export default function OTPScreen({ route, navigation }: AuthScreenProps<'OTP'>) {
    const { phoneNumber } = route.params
    const { loading, error, verifyOTP, resendOTP, clearError } = useOTP()
    const { seconds, canResend, reset } = useOTPTimer(60)

    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputs = useRef<Array<TextInput | null>>([])
    const styles = createStyles(theme)
    const { colors, spacing } = theme

    const handleChange = (text: string, index: number) => {
        clearError()
        const newOtp = [...otp]
        newOtp[index] = text
        setOtp(newOtp)

        if (text && index < 5) {
            inputs.current[index + 1]?.focus()
        }

        if (newOtp.every(digit => digit !== '')) {
            handleVerify(newOtp.join(''))
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }

    const handleVerify = async (code: string) => {
        const confirmation = getConfirmation()
        if (!confirmation) return

        const destination = await verifyOTP(confirmation, code)
        if (destination === 'register') {
            navigation.navigate('Register', { phoneNumber })
        }
    }

    const handleResend = async () => {
        const success = await resendOTP(phoneNumber)
        if (success) {
            setOtp(['', '', '', '', '', ''])
            inputs.current[0]?.focus()
            reset()
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>

                    <View style={styles.header}>
                        <Text style={styles.title}>Verify OTP</Text>
                        <Text style={styles.subtitle}>Sent to +91 {phoneNumber}</Text>
                    </View>

                    <View style={styles.otpContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                textContentType="oneTimeCode"
                                autoComplete={index === 0 ? 'sms-otp' : 'off'}
                                ref={(el) => { inputs.current[index] = el }}
                                style={styles.otpInput}
                                keyboardType="number-pad"
                                maxLength={1}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                autoFocus={index === 0}
                            />
                        ))}
                    </View>

                    {error && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}

                    <TouchableOpacity
                        disabled={!canResend || loading}
                        onPress={handleResend}
                        style={styles.resendContainer}
                    >
                        <Text style={[styles.resendText, !canResend && { color: colors.textDisabled }]}>
                            {!canResend ? `Resend code in ${seconds}s` : 'Resend Code'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            styles.button,
                            (otp.some(d => d === '') || loading) && styles.buttonDisabled,
                        ]}
                        onPress={() => handleVerify(otp.join(''))}
                        disabled={otp.some(d => d === '') || loading}
                    >
                        {loading
                            ? <ActivityIndicator color={theme.colors.primary} size="small" />
                            : <Text style={styles.buttonText}>Verify</Text>
                        }
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const createStyles = (t: typeof theme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: t.colors.background },
    inner: { padding: t.spacing.lg, flex: 1, justifyContent: 'center' },
    header: { marginBottom: t.spacing.xxl, alignItems: 'center' },
    title: { fontSize: t.fontSize.xxl, fontWeight: t.fontWeight.bold, color: t.colors.text },
    subtitle: { fontSize: t.fontSize.base, color: t.colors.textSecondary, marginTop: t.spacing.xs },
    otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: t.spacing.xl },
    otpInput: {
        width: 45,
        height: 55,
        borderWidth: 1,
        borderColor: t.colors.border,
        borderRadius: t.radius.sm,
        backgroundColor: t.colors.surface,
        textAlign: 'center',
        fontSize: t.fontSize.xl,
        fontWeight: t.fontWeight.bold,
        color: t.colors.primary,
    },
    errorText: {
        color: t.colors.error,
        fontSize: t.fontSize.sm,
        textAlign: 'center',
        marginBottom: t.spacing.sm,
    },
    resendContainer: { marginTop: t.spacing.md, alignItems: 'center' },
    resendText: { fontSize: t.fontSize.sm, fontWeight: t.fontWeight.semibold, color: t.colors.primary },
    button: {
        backgroundColor: t.colors.primary,
        height: 56,
        borderRadius: t.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: t.spacing.lg,
    },
    buttonDisabled: { backgroundColor: t.colors.textDisabled },
    buttonText: {
        color: t.colors.textInverse,
        fontSize: t.fontSize.base,
        fontWeight: t.fontWeight.bold,
    },
})