// components/Pressable/AnimatedPressable.tsx
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { theme } from 'src/theme';

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  scaleTo?: number;
  haptic?: keyof typeof theme.haptics;
  children: React.ReactNode;
}

export function AnimatedPressable({
  scaleTo = 0.96,
  haptic = 'tap',
  style,
  children,
  onPressIn,
  onPressOut,
  ...rest
}: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressableBase
      style={[animatedStyle, style]}
      onPressIn={(e) => {
        scale.value = withSpring(scaleTo, theme.motion.easing.spring);
        theme.haptics[haptic]();
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        scale.value = withSpring(1, theme.motion.easing.spring);
        onPressOut?.(e);
      }}
      {...rest}>
      {children}
    </AnimatedPressableBase>
  );
}
