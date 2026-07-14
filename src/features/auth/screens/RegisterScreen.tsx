import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { theme } from 'src/theme';
import { useRegister } from '../hooks/useRegister';
import { AuthScreenProps } from '@navigation/types';
import { useAuthStore } from '../store/useAuthStore';

export default function RegisterScreen({ route, navigation }: AuthScreenProps<'Register'>) {
  // const { phoneNumber } = route.params;
  const { completeOnboarding } = useAuthStore();
  const { loading, error, registerUser } = useRegister();

  const [firstName, setFirstName] = useState('');

  const t = theme;
  const styles = createStyles(t);

  const isFormValid = firstName.trim().length >= 2;

  const handleRegister = async () => {
    if (!isFormValid) return;
    const success = await registerUser(firstName);
    if (success) {
      completeOnboarding();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>What should we call you?</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.halfField}>
            {/* <Text style={styles.label}>your good name</Text> */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Type your name here."
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor={t.colors.textDisabled}
                autoCapitalize="words"
              />
            </View>
          </View>
        </View>

        {/* <Text style={styles.label}></Text>
        <View style={[styles.inputWrapper, styles.inputDisabled]}>
          <TextInput
            style={[styles.input, styles.inputTextDisabled]}
            value={`+91 ${phoneNumber}`}
            editable={false}
          />
        </View> */}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={!isFormValid || loading}>
          <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save & Continue'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const createStyles = (t: typeof theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: t.colors.background,
    },
    scrollContent: {
      padding: t.spacing.lg,
      paddingBottom: t.spacing.xxl,
    },
    header: {
      marginBottom: t.spacing.xl,
      marginTop: t.spacing.lg,
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
    },
    section: {
      marginBottom: t.spacing.xl,
    },
    sectionLabel: {
      fontSize: t.fontSize.xs,
      fontWeight: t.fontWeight.semibold,
      color: t.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: t.spacing.md,
    },
    row: {
      flexDirection: 'row',
      gap: t.spacing.sm,
    },
    halfField: {
      flex: 1,
    },
    label: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.semibold,
      color: t.colors.text,
      marginBottom: t.spacing.xs,
      marginTop: t.spacing.md,
    },
    optional: {
      fontWeight: t.fontWeight.regular,
      color: t.colors.textSecondary,
    },
    inputWrapper: {
      backgroundColor: t.colors.surface,
      borderRadius: t.radius.md,
      borderWidth: 1,
      borderColor: t.colors.border,
      paddingHorizontal: t.spacing.md,
      height: 54,
      justifyContent: 'center',
    },
    inputDisabled: {
      backgroundColor: t.colors.surface,
      borderColor: t.colors.border,
      opacity: 0.6,
    },
    input: {
      fontSize: t.fontSize.base,
      color: t.colors.text,
    },
    inputTextDisabled: {
      color: t.colors.textSecondary,
    },
    errorText: {
      color: t.colors.error,
      fontSize: t.fontSize.sm,
      textAlign: 'center',
      marginBottom: t.spacing.sm,
    },
    button: {
      backgroundColor: t.colors.primary,
      height: 56,
      borderRadius: t.radius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: t.spacing.md,
    },
    buttonDisabled: {
      backgroundColor: t.colors.textDisabled,
    },
    buttonText: {
      color: t.colors.textInverse,
      fontWeight: t.fontWeight.bold,
      fontSize: t.fontSize.base,
    },
  });
