import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { lightColors } from 'src/theme/colors';

interface Props {
  name: string;
  phone: string;
}

export function RiderInfoCard({ name, phone }: Props) {
  const handleCall = () => {
    Linking.openURL(`tel:${phone}`).catch((err) => console.error('Failed to open dialer:', err));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.photo, styles.photoPlaceholder]}>
        <Feather name="user" size={22} color="#999" />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
      </View>

      <TouchableOpacity style={styles.callButton} onPress={handleCall}>
        <Feather name="phone" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    // marginBottom: 12,
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  photoPlaceholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },
  vehicle: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: lightColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
