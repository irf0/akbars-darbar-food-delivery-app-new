import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { shopClosedStyles } from '../styles';
import { formatTime, getTimeUntilOpening } from '@utils/getTimeUntilOpening';
import { useAdminSettingsStore } from '@store/useAdminSettingsStore';

export default function ShopClosedScreen() {
  const [countdown, setCountdown] = useState('');

  const { settings } = useAdminSettingsStore();

  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(30));
  const [pulseAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (!settings) return;
    const interval = setInterval(() => {
      setCountdown(getTimeUntilOpening(settings?.openingTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [settings]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.12,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim, slideAnim, pulseAnim]);

  return (
    <View style={shopClosedStyles.container}>
      <View style={shopClosedStyles.arc} />

      <Animated.View
        style={[
          shopClosedStyles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}>
        <Animated.Text style={[shopClosedStyles.emoji, { transform: [{ scale: pulseAnim }] }]}>
          🍛
        </Animated.Text>

        <View
          style={{
            backgroundColor: '#C62828',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Currently Closed</Text>
        </View>

        <Text style={shopClosedStyles.title}>{"We'll Be Back\nVery Soon!"}</Text>

        {settings && (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
            }}>
            <Text style={shopClosedStyles.hoursTime}>{countdown}</Text>
            <Text style={shopClosedStyles.hoursSubLabel}>
              Opening at {formatTime(settings.openingTime)}
            </Text>
          </View>
        )}

        <Text style={shopClosedStyles.footer}>Thank you for your patience 🙏</Text>
      </Animated.View>

      <View style={shopClosedStyles.arcBottom} />
    </View>
  );
}
