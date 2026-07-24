import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

type Props = {
  label: string;
  onPress: () => void;
};

export const MenuRow = ({ label, onPress }: Props) => {
  return (
    <View>
      <TouchableOpacity style={styles.menuRow} onPress={onPress}>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.chevron}>{'›'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLabel: {
    fontSize: 15,
    color: '#111',
  },
  chevron: {
    fontSize: 18,
    color: '#ccc',
  },
});
