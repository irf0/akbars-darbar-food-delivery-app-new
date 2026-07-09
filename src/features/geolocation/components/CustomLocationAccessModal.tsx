import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from 'src/theme';

const t = theme;

interface CustomAlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: React.ReactNode;
  confirmText?: string;
  onConfirm: () => void;
}

const CustomLocationAccesModal = ({
  visible,
  title,
  message,
  icon,
  confirmText = 'Continue',
  onConfirm,
}: CustomAlertModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} />

        <View style={styles.card}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              onPress={onConfirm}>
              <Text style={styles.primaryText}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomLocationAccesModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF3E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: t.colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },

  message: {
    fontSize: 15,
    color: t.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },

  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },

  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4B5563',
  },

  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: t.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },

  pressed: {
    opacity: 0.8,
  },
});
