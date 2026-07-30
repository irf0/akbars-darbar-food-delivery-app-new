import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import HeaderCartIcon from '@components/HeaderCartIcon';
import { theme } from 'src/theme'; // If this is a static object, the below is fine.
import { Ionicons } from '@expo/vector-icons';
import { AppStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

const MenuScreenHeader = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
        <Ionicons name="arrow-back" size={25} />
      </Pressable>
      <Text style={styles.headerTitle}>Menu</Text>
      <HeaderCartIcon />
    </View>
  );
};

export default MenuScreenHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    zIndex: 10,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
});
