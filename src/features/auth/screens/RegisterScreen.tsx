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

type AddressForm = {
  area: string;
  building: string;
  street: string;
  city: string;
  label?: string;
};

export default function RegisterScreen({ route, navigation }: AuthScreenProps<'Register'>) {
  const { phoneNumber } = route.params;
  const { completeOnboarding } = useAuthStore();
  const { loading, error, registerUser } = useRegister();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState<AddressForm>({
    label: 'Home',
    area: '',
    building: '',
    street: '',
    city: 'Tinsukia',
  });

  const t = theme;
  const styles = createStyles(t);

  const isFormValid =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 1 &&
    address.area.trim().length > 0 &&
    address.building.trim().length > 0 &&
    address.city.trim().length > 0;

  const handleAddressChange = (field: keyof AddressForm, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!isFormValid) return;
    const success = await registerUser(firstName, lastName, address);
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
          <Text style={styles.title}>Create Profile</Text>
          <Text style={styles.subtitle}>Just a few details to get you started.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Personal Info</Text>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>First Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="John"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor={t.colors.textDisabled}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>Last Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Doe"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholderTextColor={t.colors.textDisabled}
                  autoCapitalize="words"
                />
              </View>
            </View>
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <View style={[styles.inputWrapper, styles.inputDisabled]}>
            <TextInput
              style={[styles.input, styles.inputTextDisabled]}
              value={`+91 ${phoneNumber}`}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Delivery Address</Text>

          <Text style={styles.label}>Area</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="e.g. Borpathar"
              value={address.area}
              onChangeText={(v) => handleAddressChange('area', v)}
              placeholderTextColor={t.colors.textDisabled}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>Building / House</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="e.g. Opposite road of Kalimandir"
              value={address.building}
              onChangeText={(v) => handleAddressChange('building', v)}
              placeholderTextColor={t.colors.textDisabled}
              autoCapitalize="sentences"
            />
          </View>

          <Text style={styles.label}>
            Street <Text style={styles.optional}>(optional)</Text>
          </Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="e.g. Main Street"
              value={address.street}
              onChangeText={(v) => handleAddressChange('street', v)}
              placeholderTextColor={t.colors.textDisabled}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>City</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              // placeholder="e.g. Tinsukia"
              value="Tinsukia"
              onChangeText={(v) => handleAddressChange('city', v)}
              placeholderTextColor={t.colors.textDisabled}
              autoCapitalize="words"
            />
          </View>
        </View>

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
