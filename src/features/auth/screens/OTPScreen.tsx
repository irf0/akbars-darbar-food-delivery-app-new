import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { AuthScreenProps } from '@navigation/types';
import { theme } from '@theme';
import { useOTP } from '../hooks/useOTP';
import AppLoader from '@components/ui/Loader';
import { getConfirmation } from '../store/confirmationRef';

export default function OTPScreen({ route, navigation }: AuthScreenProps<'OTP'>) {
    const { phoneNumber } = route.params
    const { loading, error, verifyOTP } = useOTP()

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const inputs = useRef<Array<TextInput | null>>([]);
    const activeTheme = theme.light;
    const { colors, spacing, radius, fontSize, fontWeight } = activeTheme;
    const styles = createStyles(activeTheme);



    // Resend Timer Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-focus next input
        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }

        // Auto-submit if last digit entered
        if (newOtp.every(digit => digit !== '')) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (code: string) => {
        const confirmation = getConfirmation()
        console.log('confirmation:', confirmation)
        console.log('code:', code)
        if (!confirmation) {
            console.log('No confirmation found')
            return
        }
        const destination = await verifyOTP(confirmation, code)
        if (destination === 'register') {
            navigation.navigate('Register', { phoneNumber })
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
                                textContentType="oneTimeCode"
                                autoComplete={index === 0 ? "sms-otp" : "off"} key={index}
                                ref={(el) => { inputs.current[index] = el; }}
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

                    <TouchableOpacity
                        disabled={timer > 0}
                        onPress={() => setTimer(30)}
                        style={styles.resendContainer}
                    >
                        <Text style={[styles.resendText, timer > 0 && { color: colors.textDisabled }]}>
                            {timer > 0 ? `Resend code in ${timer}s` : "Resend Code"}
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
                            ? <AppLoader variant="dots" color='primary' size='md' />
                            : <Text style={styles.buttonText}>Verify</Text>
                        }
                    </TouchableOpacity>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const createStyles = (t: typeof theme.light) => StyleSheet.create({
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
    buttonDisabled: {
        backgroundColor: t.colors.textDisabled,
    },
    buttonText: {
        color: t.colors.textInverse,
        fontSize: t.fontSize.base,
        fontWeight: t.fontWeight.bold,
    },
});
