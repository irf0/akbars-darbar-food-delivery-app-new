// screens/HelpSupportScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '@navigation/types';
import { ProfileHeader } from '../components/ProfileHeader';

type SupportRouteProp = RouteProp<AppStackParamList, 'Support'>;

export default function HelpSupportScreen() {
  const navigation = useNavigation();
  const route = useRoute<SupportRouteProp>();
  const { phone } = route.params;

  const handleCall = async () => {
    const url = `tel:${phone}`;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url);
    } else {
      Alert.alert('Unable to call', 'Calling isn\u2019t supported on this device.');
    }
  };

  const handleWhatsApp = async () => {
    const digits = phone.replace(/[^\d]/g, '');
    const url = `whatsapp://send?phone=${digits}`;
    const webFallback = `https://wa.me/${digits}`;

    const canOpenApp = await Linking.canOpenURL(url);
    Linking.openURL(canOpenApp ? url : webFallback);
  };

  return (
    <View style={styles.container}>
      <ProfileHeader title="Help & Support" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.sectionLabel}>Contact us</Text>

        <Pressable style={styles.contactRow} onPress={handleCall}>
          <View style={styles.contactTextGroup}>
            <Text style={styles.contactTitle}>Call us</Text>
            <Text style={styles.contactSubtext}>{phone}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <Pressable style={styles.contactRow} onPress={handleWhatsApp}>
          <View style={styles.contactTextGroup}>
            <Text style={styles.contactTitle}>Message on WhatsApp</Text>
            <Text style={styles.contactSubtext}>Usually replies within a few hours</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  content: { padding: 20 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sectionSpacing: { marginTop: 28 },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  contactTextGroup: { flex: 1 },
  contactTitle: { fontSize: 15, fontWeight: '600', color: '#111' },
  contactSubtext: { fontSize: 12, color: '#999', marginTop: 2 },
  chevron: { fontSize: 20, color: '#ccc' },
});
