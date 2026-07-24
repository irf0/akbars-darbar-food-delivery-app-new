import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from 'src/theme';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { Ionicons } from '@expo/vector-icons';
import CustomLocationAccesModal from '@features/geolocation/components/CustomLocationAccessModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';

const t = theme;

type OrderTypeNavigationProp = NativeStackNavigationProp<AppStackParamList, 'OrderType'>;

const ORDER_OPTIONS = [
  {
    key: 'delivery' as const,
    icon: 'bicycle-outline' as const,
    label: 'Delivery',
    subtitle: 'Straight to your doorstep',
    tint: '#FAEEDA',
    iconColor: '#993556',
  },
  {
    key: 'takeaway' as const,
    icon: 'storefront-outline' as const,
    label: 'Takeaway',
    subtitle: 'Pick it up, fresh and hot',
    tint: '#FAEEDA',
    iconColor: '#854F0B',
  },
];

const OrderTypeScreen = () => {
  const navigation = useNavigation<OrderTypeNavigationProp>();
  const { setPickup } = useOrderTypeStore();
  const [modalVisible, setModalVisible] = useState(false);

  const handleContinueWithTakeaway = () => {
    t.haptics.tap();
    setModalVisible(false);
    setPickup();
  };

  const handleDeliveryPress = () => {
    t.haptics.tap();
    setModalVisible(true);
  };

  const handleContinueWithLocation = () => {
    setModalVisible(false);
    navigation.navigate('AddressPicker');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Hero Banner ── */}
        <View style={styles.hero}>
          <View style={styles.heroGlow} pointerEvents="none" />

          <View style={styles.heroHeader}>
            <View style={styles.brandSection}>
              <Text style={styles.heroRestaurant}>{"Akbar's Darbar"}</Text>

              <Text style={styles.heroTagline}>The Royale Taste • Since 2010</Text>
            </View>

            <View style={styles.heroLogo}>
              <Ionicons name="restaurant-outline" size={26} color={t.colors.warning} />
            </View>
          </View>

          <View style={styles.heroDivider} />

          <Text style={styles.heroWelcome}>Good food is just a few taps away.</Text>

          <Text style={styles.heroSubtitle}>
            {'Have it delivered to your doorstep or pick it up fresh from the restaurant.'}
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          {ORDER_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={option.key === 'delivery' ? handleDeliveryPress : handleContinueWithTakeaway}
              style={styles.card}
              activeOpacity={0.7}>
              <View style={[styles.cardIconBox, { backgroundColor: option.tint }]}>
                <Ionicons name={option.icon} size={22} color={option.iconColor} />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardLabel}>{option.label}</Text>
                <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={t.colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <Text style={styles.footerText}>{"Serving Tinsukia's finest Royale flavours"}</Text>
        </View>
      </ScrollView>

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
  heroGlow: {
    position: 'absolute',
    right: -40,
    top: -30,
    width: 150,
    height: 150,
    borderRadius: 999,
    backgroundColor: `${t.colors.warning}12`,
  },

  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  brandSection: {
    flex: 1,
  },

  brandBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: `${t.colors.warning}12`,
    marginBottom: 12,
  },

  brandBadgeText: {
    marginLeft: 6,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: t.colors.warning,
  },

  heroLogo: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: `${t.colors.warning}12`,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: `${t.colors.warning}25`,
  },

  heroDivider: {
    marginVertical: 20,
    height: StyleSheet.hairlineWidth,
    backgroundColor: t.colors.border,
  },

  heroSubtitle: {
    marginTop: 10,

    fontSize: 13,
    fontWeight: '500',

    color: 'rgba(255,255,255,0.72)',

    letterSpacing: 0.25,
    lineHeight: 20,

    maxWidth: '82%',
  },

  container: { flex: 1, backgroundColor: t.colors.surface },
  hero: {
    backgroundColor: t.colors.primary,
    marginHorizontal: t.spacing.md,
    marginTop: t.spacing.lg,
    borderRadius: t.radius.lg,
    paddingHorizontal: t.spacing.lg,
    paddingVertical: t.spacing.xl,
    overflow: 'hidden',
  },
  heroAccent: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: t.radius.full,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  crownBadge: {
    width: 40,
    height: 40,
    borderRadius: t.radius.full,
    backgroundColor: 'rgba(240,195,107,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(240,195,107,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroRestaurant: {
    fontSize: 28,
    fontWeight: '900',
    color: t.colors.textInverse,
    letterSpacing: 0.5,
  },
  heroTagline: {
    fontSize: 13,
    color: t.colors.warning,
    fontStyle: 'italic',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: t.spacing.md,
    marginBottom: t.spacing.sm,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7BC67B',
  },
  statusText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statusDivider: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
  },
  heroWelcome: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 24,
    fontWeight: '700',
  },
  specialsSection: {
    paddingTop: t.spacing.lg,
    paddingLeft: t.spacing.md,
  },
  specialsHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: t.colors.textSecondary,
    marginBottom: t.spacing.sm,
  },
  specialsRow: {
    gap: t.spacing.sm,
    paddingRight: t.spacing.md,
  },
  specialCard: {
    width: 104,
    backgroundColor: t.colors.background,
    borderRadius: t.radius.md,
    padding: 8,
    ...t.shadow.sm,
  },
  specialImageBox: {
    width: '100%',
    height: 64,
    borderRadius: t.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialLabel: {
    fontSize: 11,
    color: t.colors.text,
    marginTop: 6,
  },
  cardsContainer: {
    paddingHorizontal: t.spacing.md,
    paddingTop: t.spacing.lg,
    gap: t.spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.colors.background,
    borderRadius: t.radius.lg,
    padding: t.spacing.md,
    gap: t.spacing.md,
    ...t.shadow.sm,
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: t.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    gap: 2,
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
  footer: {
    alignItems: 'center',
    paddingHorizontal: t.spacing.xl,
    paddingTop: t.spacing.lg,
    paddingBottom: t.spacing.lg,
  },
  footerDivider: {
    width: 32,
    height: 2,
    backgroundColor: t.colors.border,
    marginBottom: t.spacing.sm,
    borderRadius: t.radius.full,
  },
  footerText: {
    fontSize: 12,
    color: t.colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
