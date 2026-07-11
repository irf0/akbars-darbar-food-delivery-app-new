import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { theme } from '@theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';

type ProfileNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const setPickup = useOrderTypeStore((state) => state.setPickup);

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>

      <TouchableOpacity style={styles.btn} onPress={() => setPickup()}>
        <Text style={styles.txt}>{'Change to Takeaway'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddressPicker')}>
        <Text style={styles.txt}>{'Change to Delivery'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  btn: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
  txt: {
    color: '#fff',
  },
});
