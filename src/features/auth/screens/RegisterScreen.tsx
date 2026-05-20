import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { theme } from '@theme';
import { useRegister } from '../hooks/useRegister';
import { AuthScreenProps } from '@navigation/types';
import { useAuthStore } from '../store/useAuthStore';

export default function RegisterScreen({ route, navigation }: AuthScreenProps<'Register'>) {
    const { completeOnboarding } = useAuthStore()
    const { loading, error, registerUser } = useRegister()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const t = theme.light;
    const styles = createStyles(t);

    const isFormValid = firstName.trim().length > 3 && lastName.trim().length > 0

    const handleRegister = async () => {
        if (!isFormValid) return
        const success = await registerUser(firstName, lastName)
        if (success) {
            completeOnboarding()
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Create Profile</Text>
                    <Text style={styles.subtitle}>Just a few more details to set up your account.</Text>
                </View>

                <View style={styles.form}>
                    {/* First Name */}
                    <Text style={styles.label}>First Name</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="John"
                            value={firstName}
                            onChangeText={setFirstName}
                            placeholderTextColor={t.colors.textDisabled}
                        />
                    </View>

                    {/* Last Name */}
                    <Text style={styles.label}>Last Name</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Doe"
                            value={lastName}
                            onChangeText={setLastName}
                            placeholderTextColor={t.colors.textDisabled}
                        />
                    </View>

                </View>

                {error && (
                    <Text style={styles.errorText}>{error}</Text>
                )}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        styles.button,
                        (!isFormValid || loading) && { backgroundColor: t.colors.textDisabled },
                        t.shadow.md
                    ]}
                    onPress={handleRegister}
                    disabled={!isFormValid || loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'SAVING...' : 'SAVE & CONTINUE'}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const createStyles = (t: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: t.colors.background,
    },
    scrollContent: {
        padding: t.spacing.lg,
        flexGrow: 1,
        justifyContent: 'center'
    },
    header: {
        marginBottom: t.spacing.xxl
    },
    title: {
        fontSize: t.fontSize.xxl,
        fontWeight: t.fontWeight.bold,
        color: t.colors.text
    },
    subtitle: {
        fontSize: t.fontSize.base,
        color: t.colors.textSecondary,
        marginTop: t.spacing.xs
    },
    form: {
        marginBottom: t.spacing.lg
    },
    label: {
        fontSize: t.fontSize.sm,
        fontWeight: t.fontWeight.semibold,
        color: t.colors.text,
        marginBottom: t.spacing.xs,
        marginTop: t.spacing.md
    },
    inputWrapper: {
        backgroundColor: t.colors.surface,
        borderRadius: t.radius.md,
        borderWidth: 1,
        borderColor: t.colors.border,
        paddingHorizontal: t.spacing.md,
        height: 54,
        justifyContent: 'center'
    },
    input: {
        fontSize: t.fontSize.base,
        color: t.colors.text,
    },
    errorText: {
        color: t.colors.error,
        fontSize: t.fontSize.xs,
        marginTop: t.spacing.xs,
    },
    button: {
        backgroundColor: t.colors.primary,
        height: 56,
        borderRadius: t.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: t.spacing.xl
    },
    buttonText: {
        color: t.colors.textInverse,
        fontWeight: t.fontWeight.bold,
        fontSize: t.fontSize.base,
        letterSpacing: 0.5
    }
});