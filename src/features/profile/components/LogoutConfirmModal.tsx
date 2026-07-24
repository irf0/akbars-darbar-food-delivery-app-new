import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@theme';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmModal({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  destructive = false,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
              onPress={onCancel}>
              <Text style={styles.secondaryButtonText}>{cancelText}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                destructive && styles.destructiveButton,
                pressed && styles.pressed,
              ]}
              onPress={onConfirm}>
              <Text style={styles.primaryButtonText}>{confirmText}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },

  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    ...theme.shadow.lg,
  },

  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  message: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },

  actions: {
    flexDirection: 'row',
    marginTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },

  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 0.3,
    borderColor: theme.colors.primary,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },

  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  destructiveButton: {
    backgroundColor: theme.colors.error ?? '#DC2626',
  },

  primaryButtonText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },

  pressed: {
    opacity: 0.85,
  },
});
