import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { theme } from '@theme';
import { easing } from 'src/theme/motion';
import { haptics } from 'src/theme/haptics';

type NavProp = NativeStackNavigationProp<AppStackParamList>;

export const HomeSearchBar = () => {
  const navigation = useNavigation<NavProp>();
  const scale = useSharedValue(1);

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
    navigation.navigate('Search');
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={handlePress}>
      <Animated.View style={[styles.searchBar, animatedStyle]}>
        <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
        <Text style={styles.placeholder}>Search biryani, kebabs...</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 56,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 18,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    shadowOffset: { width: 0, height: 5 },
  },
  placeholder: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
});
