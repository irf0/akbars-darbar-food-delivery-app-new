import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from 'src/theme';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { Ionicons } from '@expo/vector-icons';
import CustomLocationAccesModal from '@features/geolocation/components/CustomLocationAccessModal';
import { checkLocationPermission } from '@utils/permissions/expopermissions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';

const t = theme;

const OPTIONS = [
  {
    type: 'delivery' as const,
    emoji: '🛵',
    label: 'Delivery',
    subtitle: 'Get it delivered to your door',
  },
  {
    type: 'takeaway' as const,
    emoji: '🥡',
    label: 'Takeaway',
    subtitle: 'Pick it up from the restaurant',
  },
];

type OrderTypeNavigationProp = NativeStackNavigationProp<AppStackParamList, 'OrderType'>;

const OrderTypeScreen = () => {
  const navigation = useNavigation<OrderTypeNavigationProp>();
  const { setOrderType } = useOrderTypeStore();
  const [modalVisible, setModalVisible] = useState(false);

  const handleChooseOrderType = async (type: 'delivery' | 'takeaway') => {
    if (type === 'takeaway') {
      setOrderType(type);
      return;
    }

    const { status } = await checkLocationPermission();
    if (status === 'granted') {
      setOrderType('delivery');
      navigation.navigate('AddressPicker');
      return;
    }

    setModalVisible(true);
  };

  const handleContinueWithLocation = () => {
    setModalVisible(false);
    setOrderType('delivery');
    navigation.navigate('AddressPicker');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Hero Banner ── */}
      <View style={styles.hero}>
        <Text style={styles.heroRestaurant}>{"Akbar's Darbar"}</Text>
        <Text style={styles.heroTagline}>✦ Enjoy the Royale Taste ✦</Text>
        <View style={styles.heroDivider} />
        <Text style={styles.heroWelcome}>
          Welcome back! How would{'\n'}you like your order today?
        </Text>
      </View>

      {/* ── Cards ── */}
      <View style={styles.cardsContainer}>
        {OPTIONS.map(({ type, emoji, label, subtitle }) => (
          <TouchableOpacity
            key={type}
            style={styles.card}
            onPress={() => handleChooseOrderType(type)}
            activeOpacity={0.85}>
            <View style={styles.cardIconBox}>
              <Text style={styles.cardEmoji}>{emoji}</Text>
            </View>

            <View style={styles.cardText}>
              <Text style={styles.cardLabel}>{label}</Text>
              <Text style={styles.cardSubtitle}>{subtitle}</Text>
            </View>

            <Text style={styles.cardArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomLocationAccesModal
        visible={modalVisible}
        title="Location Access"
        message="We use your location to check if we deliver to your area."
        icon={<Ionicons name="location" size={30} color={theme.colors.primary} />}
        confirmText="Continue"
        onConfirm={handleContinueWithLocation}
      />
    </SafeAreaView>
  );
};

export default OrderTypeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: t.colors.surface },
  hero: {
    backgroundColor: t.colors.primary,
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  heroRestaurant: { fontSize: 28, fontWeight: '900', color: '#fff', letterSpacing: 0.5 },
  heroTagline: {
    fontSize: 13,
    color: '#EAB308',
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  heroDivider: { width: 40, height: 2, backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: 12 },
  heroWelcome: { fontSize: 16, color: 'rgba(255,255,255,0.85)', lineHeight: 24, fontWeight: '400' },
  cardsContainer: { paddingHorizontal: 16, paddingTop: 24, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.colors.background,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardIconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: t.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: { fontSize: 26 },
  cardText: {
    flex: 1,
    gap: 3,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: t.colors.text,
  },
  cardSubtitle: {
    fontSize: 12,
    color: t.colors.textSecondary,
    lineHeight: 16,
  },
  cardArrow: {
    fontSize: 26,
    color: t.colors.primary,
    fontWeight: '300',
  },
});
