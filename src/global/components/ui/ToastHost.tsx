import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@theme';
import { easing } from 'src/theme/motion';
import { useToastStore, ToastType } from '@store/useToastStore';

type IconName = ComponentProps<typeof Ionicons>['name'];

const TOAST_CONFIG: Record<ToastType, { icon: IconName; color: string; bg: string }> = {
  success: {
    icon: 'checkmark-circle',
    color: theme.colors.successText,
    bg: theme.colors.successBg,
  },
  error: { icon: 'close-circle', color: theme.colors.errorText, bg: theme.colors.errorBg },
  info: { icon: 'information-circle', color: theme.colors.info, bg: theme.colors.infoBg },
};

const AUTO_DISMISS_MS = 2000;

export const ToastHost = () => {
  const { visible, message, type, bottomOffset, hide } = useToastStore();
  const insets = useSafeAreaInsets();

  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, easing.spring);
      opacity.value = withTiming(1, { duration: 200 });

      const timer = setTimeout(() => {
        translateY.value = withSpring(40, easing.spring);
        opacity.value = withTiming(0, { duration: 200 }, (finished) => {
          if (finished) {
            // runOnJS needed if you want to call hide() from the worklet;
            // simpler to just let the JS timeout below handle it
          }
        });
      }, AUTO_DISMISS_MS);

      const hideTimer = setTimeout(() => hide(), AUTO_DISMISS_MS + 250);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [visible, message]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  const config = TOAST_CONFIG[type];

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        { bottom: insets.bottom + 20 + bottomOffset, backgroundColor: config.bg },
        animatedStyle,
      ]}>
      <Ionicons name={config.icon} size={18} color={config.color} />
      <Text style={[styles.text, { color: config.color }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    zIndex: 999,
  },
  text: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  },
});
