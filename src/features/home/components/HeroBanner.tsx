import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { theme } from 'src/theme';

interface Props {
  onPress: () => void;
}

const t = theme;
export const HeroBanner = ({ onPress }: Props) => {
  return (
    <View style={styles.heroBanner}>
      <View style={styles.heroContent}>
        <Text style={styles.heroEyebrow}>{"TODAY'S SPECIAL"}</Text>
        <Text style={styles.heroTitle}>
          Dum Biryani{'\n'}
          <Text style={styles.heroAccent}>Made Fresh Daily</Text>
        </Text>
        <TouchableOpacity style={styles.heroBtn} onPress={onPress}>
          <Text style={styles.heroBtnText}>Order Now</Text>
          <Ionicons name="arrow-forward" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.heroEmoji}>🍛</Text>
    </View>
  );
};

export default HeroBanner;

const styles = StyleSheet.create({
  heroBanner: {
    backgroundColor: t.colors.primary,
    borderRadius: t.radius.xl,
    padding: t.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: t.spacing.xl,
    overflow: 'hidden',
  },
  heroContent: { flex: 1 },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: t.fontSize.xl,
    fontWeight: t.fontWeight.bold,
    color: '#fff',
    lineHeight: 26,
    marginBottom: t.spacing.md,
  },
  heroAccent: {
    color: '#FFD700',
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: t.spacing.md,
    paddingVertical: t.spacing.xs,
    borderRadius: t.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroBtnText: {
    color: '#fff',
    fontSize: t.fontSize.sm,
    fontWeight: t.fontWeight.semibold,
  },
  heroEmoji: {
    fontSize: 64,
    marginLeft: t.spacing.sm,
  },
});
