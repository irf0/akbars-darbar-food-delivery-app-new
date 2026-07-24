import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { AppStackParamList } from '@navigation/types';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import CustomAlertModal from '@components/CustomAlertModal';
import { theme } from '@theme';
import { easing } from 'src/theme/motion';
import { haptics } from 'src/theme/haptics';

type NavProp = NativeStackNavigationProp<AppStackParamList>;

export const OrderTypeBar = () => {
  const navigation = useNavigation<NavProp>();

  const orderType = useOrderTypeStore((s) => s.orderType);
  const address = useOrderTypeStore((s) => s.address);
  const setPickup = useOrderTypeStore((s) => s.setPickup);

  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const scale = useSharedValue(1);

  const isDelivery = orderType === 'delivery';

  const subtitle = isDelivery
    ? address?.formattedAddress || 'Choose your delivery address'
    : 'Collect your order from the restaurant';

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.98, easing.spring);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, easing.spring);
  };

  const handlePress = () => {
    haptics.tap();
    setShowSwitchModal(true);
  };

  const handleSwitchConfirm = () => {
    setShowSwitchModal(false);

    if (isDelivery) {
      setPickup();
    } else {
      navigation.navigate('AddressList');
    }
  };

  return (
    <>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={handlePress}>
        <Animated.View style={[styles.strip, animatedStyle]}>
          <Ionicons
            name={isDelivery ? 'bicycle' : 'bag-handle'}
            size={16}
            color={theme.colors.primary}
          />

          <Text style={styles.mode}>{isDelivery ? 'DELIVERY' : 'PICKUP'}</Text>

          <View style={styles.divider} />

          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subtitle}>
            {subtitle}
          </Text>

          <Ionicons name="chevron-forward" size={14} color={theme.colors.textSecondary} />
        </Animated.View>
      </Pressable>

      <CustomAlertModal
        visible={showSwitchModal}
        title={isDelivery ? 'Switch to Pickup?' : 'Switch to Delivery?'}
        message={
          isDelivery
            ? 'Menu prices will change to pickup pricing.'
            : 'Select a delivery address before continuing.'
        }
        icon={
          <Ionicons
            name={isDelivery ? 'bag-handle' : 'bicycle'}
            size={30}
            color={theme.colors.primary}
          />
        }
        cancelText="Cancel"
        confirmText={isDelivery ? 'Switch' : 'Choose Address'}
        onCancel={() => setShowSwitchModal(false)}
        onConfirm={handleSwitchConfirm}
      />
    </>
  );
};

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

    paddingHorizontal: 20,
    paddingVertical: 10,

    backgroundColor: theme.colors.surface,
  },

  mode: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: theme.colors.primary,
  },

  divider: {
    width: 1,
    height: 12,
    backgroundColor: theme.colors.border,
  },

  subtitle: {
    flex: 1,
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});
