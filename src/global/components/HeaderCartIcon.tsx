import React, { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { useFlyToCartStore } from '@store/useFlyToCartStore';
import { useCartStore } from '@store/useCartStore';
import { theme } from '@theme';
import { easing } from 'src/theme/motion';
import { haptics } from 'src/theme/haptics';

type NavProp = NativeStackNavigationProp<AppStackParamList>;

const HeaderCartIcon = () => {
  const navigation = useNavigation<NavProp>();

  const cartRef = useRef<View>(null);

  const setCartTarget = useFlyToCartStore((state) => state.setCartTarget);
  const totalItems = useCartStore((state) => state.totalItems());

  const cartScale = useSharedValue(1);
  const badgeScale = useSharedValue(1);

  const cartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartScale.value }],
  }));

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  useEffect(() => {
    if (totalItems > 0) {
      badgeScale.value = withSequence(withSpring(1.3, easing.spring), withSpring(1, easing.spring));
    }
  }, [totalItems]);

  const registerCartTarget = useCallback(() => {
    cartRef.current?.measureInWindow((x, y, width, height) => {
      setCartTarget({
        x,
        y,
        width,
        height,
      });
    });
  }, [setCartTarget]);

  const onCartPressIn = () => {
    cartScale.value = withSpring(0.92, easing.spring);
  };

  const onCartPressOut = () => {
    cartScale.value = withSpring(1, easing.spring);
  };

  const handleCartPress = () => {
    haptics.tap();
    navigation.navigate('Cart');
  };

  return (
    <Pressable
      onLayout={registerCartTarget}
      onPressIn={onCartPressIn}
      onPressOut={onCartPressOut}
      onPress={handleCartPress}
      hitSlop={8}>
      <Animated.View ref={cartRef} style={[styles.cartButton, cartAnimatedStyle]}>
        <Ionicons name="bag-outline" size={24} color={theme.colors.text} />

        {totalItems > 0 && (
          <Animated.View style={[styles.badge, badgeAnimatedStyle]}>
            <Text style={styles.badgeText}>{totalItems > 99 ? '99+' : totalItems}</Text>
          </Animated.View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default React.memo(HeaderCartIcon);

const styles = StyleSheet.create({
  cartButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },

  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: theme.colors.textInverse,
  },

  badgeText: {
    color: theme.colors.textInverse,
    fontSize: 11,
    fontWeight: '700',
  },
});
