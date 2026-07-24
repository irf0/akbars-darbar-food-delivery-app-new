import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderCartIcon from '@components/HeaderCartIcon';
import { theme } from 'src/theme';

const t = theme;

const MenuScreenHeader = React.memo(() => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Menu</Text>
    <HeaderCartIcon />
  </View>
));
MenuScreenHeader.displayName = 'MenuScreenHeader';

export default MenuScreenHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: t.colors.background,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    zIndex: 10,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: t.fontSize.xl,
    fontWeight: t.fontWeight.bold,
    color: t.colors.text,
  },
});
