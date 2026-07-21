import React, { useRef, useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { AuthScreenProps } from '@navigation/types';
import { theme } from 'src/theme';
import { useOTP } from '../hooks/useOTP';
import { useOTPTimer } from '../hooks/useOTPTimer';
import { getConfirmation } from '../store/confirmationRef';

const OTP_LENGTH = 6;

export default function OTPScreen({ route, navigation }: AuthScreenProps<'OTP'>) {
  const { phoneNumber } = route.params;
  const { loading, error, verifyOTP, resendOTP, clearError } = useOTP();
  const { seconds, canResend, reset } = useOTPTimer(60);

  const [otp, setOtp] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const hiddenInputRef = useRef<TextInput | null>(null);
  const styles = createStyles(theme);
  const { colors } = theme;

  const handleChange = (text: string) => {
    clearError();
    const digitsOnly = text.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    setOtp(digitsOnly);

    if (digitsOnly.length === OTP_LENGTH) {
      handleVerify(digitsOnly);
    }
  };

  const handleVerify = async (code: string) => {
    const confirmation = getConfirmation();
    if (!confirmation) return;

    const destination = await verifyOTP(confirmation, code);
    if (destination === 'register') {
      navigation.navigate('Register', { phoneNumber });
    }
  };

  const handleResend = async () => {
    const success = await resendOTP(phoneNumber);
    if (success) {
      setOtp('');
      hiddenInputRef.current?.focus();
      reset();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>Sent to +91 {phoneNumber}</Text>
          </View>

          {/* Visual boxes — pure display, driven by `otp` string */}
          <TouchableWithoutFeedback onPress={() => hiddenInputRef.current?.focus()}>
            <View style={styles.otpContainer}>
              {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                const digit = otp[index] ?? '';
                const isActiveBox = isFocused && index === otp.length;

                return (
                  <View
                    key={index}
                    style={[
                      styles.otpBox,
                      isActiveBox && styles.otpBoxActive,
                      !!error && styles.otpBoxError,
                    ]}>
                    <Text style={styles.otpDigit}>{digit}</Text>
                  </View>
                );
              })}
            </View>
          </TouchableWithoutFeedback>

          {/* Real input — invisible, captures typing/autofill/paste */}
          <TextInput
            ref={hiddenInputRef}
            value={otp}
            onChangeText={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            maxLength={OTP_LENGTH}
            autoFocus
            style={styles.hiddenInput}
            caretHidden
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            disabled={!canResend || loading}
            onPress={handleResend}
            style={styles.resendContainer}>
            <Text style={[styles.resendText, !canResend && { color: colors.textDisabled }]}>
              {!canResend ? `Resend code in ${seconds}s` : 'Resend Code'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, (otp.length < OTP_LENGTH || loading) && styles.buttonDisabled]}
            onPress={() => handleVerify(otp)}
            disabled={otp.length < OTP_LENGTH || loading}>
            {loading ? (
              <ActivityIndicator color={theme.colors.textInverse} size="small" />
            ) : (
              <Text style={styles.buttonText}>Verify</Text>
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const createStyles = (t: typeof theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: t.colors.background },
    inner: { padding: t.spacing.lg, flex: 1, justifyContent: 'center' },
    header: { marginBottom: t.spacing.xxl, alignItems: 'center' },
    title: { fontSize: t.fontSize.xxl, fontWeight: t.fontWeight.bold, color: t.colors.text },
    subtitle: { fontSize: t.fontSize.base, color: t.colors.textSecondary, marginTop: t.spacing.xs },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: t.spacing.xl,
    },
    otpBox: {
      width: 45,
      height: 55,
      borderWidth: 1,
      borderColor: t.colors.border,
      borderRadius: t.radius.sm,
      backgroundColor: t.colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    otpBoxActive: {
      borderColor: t.colors.primary,
      borderWidth: 1.5,
    },
    otpBoxError: {
      borderColor: t.colors.error,
    },
    otpDigit: {
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.bold,
      color: t.colors.primary,
    },
    // Real input sits off-screen — captures focus, typing, autofill, paste
    hiddenInput: {
      position: 'absolute',
      opacity: 0,
      height: 1,
      width: 1,
    },
    errorText: {
      color: t.colors.error,
      fontSize: t.fontSize.sm,
      textAlign: 'center',
      marginBottom: t.spacing.sm,
    },
    resendContainer: { marginTop: t.spacing.md, alignItems: 'center' },
    resendText: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.semibold,
      color: t.colors.primary,
    },
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
  });
