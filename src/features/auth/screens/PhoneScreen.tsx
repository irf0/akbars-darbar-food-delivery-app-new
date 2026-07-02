import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import { AuthScreenProps } from '@navigation/types';
import { theme } from 'src/theme';
import { useLogin } from '../hooks/useLogin';
import { setConfirmation } from '../store/confirmationRef';

export default function PhoneScreen({ navigation }: AuthScreenProps<'Phone'>) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validationError, setValidationError] = useState('');
    const [errorDismissed, setErrorDismissed] = useState(false);
    const { sendOTP, loading, error } = useLogin();
    const activeTheme = theme;
    const { colors, spacing, shadow } = activeTheme;
    const styles = createStyles(activeTheme);

    const handleChangeText = (value: string) => {
        setPhoneNumber(value);
        if (validationError) setValidationError('');
    };

    const handleBlur = () => {
        if (phoneNumber.length > 0 && phoneNumber.length < 10) {
            setValidationError('Enter a valid 10-digit number');
        }
    };

    const handleContinue = async () => {
        if (phoneNumber.length < 10) {
            setValidationError('Enter a valid 10-digit number')
            return
        }
        setErrorDismissed(false)
        const result = await sendOTP(phoneNumber)
        if (result) {
            setConfirmation(result)
            navigation.navigate('OTP', { phoneNumber })
        }
    }

    const hasInputError = !!validationError;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>

                    {/* API / network error banner */}
                    {error && !errorDismissed && (
                        <View style={styles.errorBanner}>
                            <Text style={styles.errorIcon}>⚠</Text>
                            <View style={styles.errorContent}>
                                <Text style={styles.errorTitle}>Couldn't send the code</Text>
                                <Text style={styles.errorSubtitle}>Check your number and try again.</Text>
                            </View>
                            <TouchableOpacity onPress={() => setErrorDismissed(true)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                <Text style={styles.errorDismiss}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome</Text>
                        <Text style={styles.subtitle}>
                            Enter your phone number to receive a verification code.
                        </Text>
                    </View>

                    <View style={[
                        styles.inputWrapper,
                        hasInputError && styles.inputWrapperError,
                    ]}>
                        <View style={[
                            styles.prefix,
                            hasInputError && styles.prefixError,
                        ]}>
                            <Text style={styles.prefixText}>+91</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="00000 00000"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={handleChangeText}
                            onBlur={handleBlur}
                            maxLength={10}
                            placeholderTextColor={colors.textDisabled}
                            autoFocus
                        />
                    </View>

                    {/* Field-level validation error */}
                    {hasInputError && (
                        <View style={styles.fieldError}>
                            <Text style={styles.fieldErrorText}>{validationError}</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            styles.button,
                            (phoneNumber.length < 10 || loading) && styles.buttonDisabled,
                            shadow.md,
                        ]}
                        onPress={handleContinue}
                        disabled={phoneNumber.length < 10 || loading}
                    >
                        {loading
                            ? <ActivityIndicator color={theme.colors.primary} size='large' />
                            : <Text style={styles.buttonText}>Send Code</Text>
                        }
                    </TouchableOpacity>

                    <Text style={styles.footerText}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                        <Text style={styles.linkText}>Privacy Policy</Text>.
                    </Text>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const createStyles = (t: typeof theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: t.colors.background,
    },
    inner: {
        padding: t.spacing.lg,
        flex: 1,
        justifyContent: 'center',
    },

    // API error banner
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: t.spacing.sm,
        backgroundColor: '#FCEBEB',
        borderWidth: 0.5,
        borderColor: '#F09595',
        borderRadius: t.radius.md,
        padding: t.spacing.sm + 2,
        marginBottom: t.spacing.xl,
    },
    errorIcon: {
        fontSize: 14,
        color: '#A32D2D',
        marginTop: 1,
    },
    errorContent: {
        flex: 1,
    },
    errorTitle: {
        fontSize: 13,
        fontWeight: t.fontWeight.semibold,
        color: '#501313',
        lineHeight: 18,
    },
    errorSubtitle: {
        fontSize: 12,
        color: '#791F1F',
        marginTop: 2,
        lineHeight: 17,
    },
    errorDismiss: {
        fontSize: 13,
        color: '#A32D2D',
        opacity: 0.7,
    },

    // Field-level validation error
    fieldError: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: -(t.spacing.sm),
        marginBottom: t.spacing.md,
        paddingHorizontal: 2,
    },
    fieldErrorText: {
        fontSize: 12,
        color: '#791F1F',
        lineHeight: 16,
    },

    header: {
        marginBottom: t.spacing.xxl,
    },
    title: {
        fontSize: t.fontSize.xxl,
        fontWeight: t.fontWeight.bold,
        color: t.colors.text,
    },
    subtitle: {
        fontSize: t.fontSize.base,
        color: t.colors.textSecondary,
        marginTop: t.spacing.xs,
        lineHeight: t.lineHeight.base,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: t.colors.surface,
        borderRadius: t.radius.md,
        borderWidth: 1,
        borderColor: t.colors.border,
        paddingHorizontal: t.spacing.md,
        height: 56,
        marginBottom: t.spacing.xs,
    },
    inputWrapperError: {
        borderColor: '#F09595',
    },
    prefix: {
        borderRightWidth: 1,
        borderRightColor: t.colors.border,
        paddingRight: t.spacing.sm,
        marginRight: t.spacing.sm,
    },
    prefixError: {
        borderRightColor: '#F09595',
    },
    prefixText: {
        fontSize: t.fontSize.md,
        fontWeight: t.fontWeight.semibold,
        color: t.colors.text,
    },
    input: {
        flex: 1,
        fontSize: t.fontSize.lg,
        fontWeight: t.fontWeight.medium,
        color: t.colors.text,
    },
    button: {
        backgroundColor: t.colors.primary,
        height: 56,
        borderRadius: t.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: t.spacing.sm,
    },
    buttonDisabled: {
        backgroundColor: t.colors.textDisabled,
    },
    buttonText: {
        color: t.colors.textInverse,
        fontSize: t.fontSize.base,
        fontWeight: t.fontWeight.bold,
    },
    footerText: {
        marginTop: t.spacing.lg,
        textAlign: 'center',
        fontSize: 12,
        color: t.colors.textSecondary,
        lineHeight: 18,
        paddingHorizontal: t.spacing.md,
    },
    linkText: {
        color: t.colors.primary,
        fontWeight: t.fontWeight.semibold,
    },
});