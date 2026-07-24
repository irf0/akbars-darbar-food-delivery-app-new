// screens/EditProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { theme } from '@theme';
import { updateUserNameInDb } from 'src/global/services/updateProfileService';
import { useToastStore } from '@store/useToastStore';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuthStore();

  const userId = user?.uid;
  const [name, setName] = useState<string>(user?.firstName || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToastStore.getState();

  const isValid = name.length > 0;

  const handleSave = async () => {
    if (!isValid) {
      setError('Name is required');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await updateUserNameInDb(userId, { name });
      toast.show({
        message: 'Name update successfully',
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      console.log('Something went wrong', error);
      toast.show({
        message: 'Something went wrong! Please try again',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backButton}>
          <Ionicons name="arrow-back" size={25} />
        </Pressable>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          value={name}
          onChangeText={(t) => {
            setName(t);
            if (error) setError(null);
          }}
          placeholder="Your name"
          autoCapitalize="words"
          returnKeyType="done"
          maxLength={60}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Phone number</Text>
        <View style={styles.readOnlyBox}>
          <Text>{user?.phone ? `${user.phone.slice(0, 3)} | ${user.phone.slice(3)}` : '—'} </Text>
        </View>
        <Text style={styles.helperText}>
          {"Phone numbers can't be changed here. Contact support if you need to update it."}
        </Text>
      </View>

      <Pressable
        style={[styles.saveButton, (!isValid || saving) && styles.saveButtonDisabled]}
        disabled={!isValid || saving}
        onPress={handleSave}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save changes</Text>
        )}
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111',
  },
  inputError: { borderColor: '#d33' },
  errorText: { color: '#d33', fontSize: 12, marginTop: 4 },
  readOnlyBox: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  readOnlyText: { fontSize: 16, color: '#888' },
  helperText: { fontSize: 12, color: '#999', marginTop: 6 },
  saveButton: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: '#111',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  headerSpacer: {
    width: 40,
  },
});
