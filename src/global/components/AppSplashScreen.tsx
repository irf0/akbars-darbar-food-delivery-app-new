import { theme } from '@theme';
import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

export const COLORS = {
  brandMaroon: '#7A0C1A',
  brandGold: '#D4AF37',
  brandGoldLight: '#E8C766',
  brandGoldDark: '#B8912C',
};

export default function AppSplashScreen() {
  const [titleOpacity] = useState(() => new Animated.Value(0));
  const [titleScale] = useState(() => new Animated.Value(0.95));
  const [taglineOpacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(titleScale, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: titleOpacity, transform: [{ scale: titleScale }] }}>
        <Text style={styles.title}>{"AKBAR'S"}</Text>
        <Text style={styles.title}>{'DARBAR'}</Text>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.diamond}>◆</Text>
          <View style={styles.line} />
        </View>
      </Animated.View>
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Enjoy the Royale Taste
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brandMaroon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.surface,
    fontSize: 34,
    fontWeight: 'bold',
    letterSpacing: 3,
    textAlign: 'center',
    fontFamily: undefined, // swap in your serif font once loaded, e.g. 'Cinzel-Bold'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 160,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.brandGold,
  },
  diamond: {
    color: COLORS.brandGold,
    fontSize: 12,
    marginHorizontal: 8,
  },
  tagline: {
    marginTop: 16,
    color: COLORS.brandGold,
    fontSize: 14,
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },
});
