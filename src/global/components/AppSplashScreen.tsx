import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

export const COLORS = {
  brandMaroon: '#7A0C1A',
  brandMaroonDeep: '#3D0610',
  brandGold: '#D4AF37',
  brandGoldLight: '#E8C766',
  brandGoldDark: '#B8912C',
  cream: '#F5EDE0',
};

export default function AppSplashScreen() {
  const [titleOpacity] = useState(() => new Animated.Value(0));
  const [titleScale] = useState(() => new Animated.Value(0.95));
  const [taglineOpacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(titleScale, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
      Animated.timing(taglineOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.titleWrapper,
          { opacity: titleOpacity, transform: [{ scale: titleScale }] },
        ]}>
        <Text style={styles.title}>{"AKBAR'S"}</Text>
        <Text style={styles.title}>{'DARBAR'}</Text>
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.diamond}>◆</Text>
          <View style={styles.line} />
        </View>
      </Animated.View>
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        ENJOY THE ROYALE TASTE
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.brandMaroonDeep,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    alignItems: 'center',
  },
  title: {
    color: COLORS.cream,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 4,
    textAlign: 'center',
    fontFamily: undefined,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    width: 120,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.brandGoldDark,
  },
  diamond: {
    color: COLORS.brandGold,
    fontSize: 9,
    marginHorizontal: 10,
  },
  tagline: {
    marginTop: 20,
    color: COLORS.brandGoldDark,
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '500',
  },
});
