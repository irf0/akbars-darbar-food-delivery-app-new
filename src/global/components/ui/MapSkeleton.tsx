import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';
import { theme } from '@theme';

const { width, height } = Dimensions.get('window');

export const MapSkeleton = () => {
  const [shimmerAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const shimmerOpacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.65],
  });

  // Faint grid lines to read as "map-shaped" rather than a plain gray block
  const horizontalLines = Array.from({ length: 6 });
  const verticalLines = Array.from({ length: 4 });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.base, { opacity: shimmerOpacity }]} />

      <View style={styles.gridOverlay} pointerEvents="none">
        {horizontalLines.map((_, i) => (
          <View
            key={`h-${i}`}
            style={[styles.hLine, { top: (height / horizontalLines.length) * i }]}
          />
        ))}
        {verticalLines.map((_, i) => (
          <View
            key={`v-${i}`}
            style={[styles.vLine, { left: (width / verticalLines.length) * i }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    zIndex: 1,
  },
  base: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#D8DCE0',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  hLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  vLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
