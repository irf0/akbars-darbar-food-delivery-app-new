import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  Linking,
} from 'react-native';
import React, { useState } from 'react';
import { useOrderTypeStore } from '@store/useOrderTypeStore';
import { theme } from '@theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigation/types';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { MenuRow } from '../components/MenuRow';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateNotificationPrefsInDb } from 'src/global/services/updateProfileService';
import { useToastStore } from '@store/useToastStore';
import { restaurantConfig } from '@config/restaurant.config';
import LogoutConfirmModal from '../components/LogoutConfirmModal';

type ProfileNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const setPickup = useOrderTypeStore((state) => state.setPickup);
  const orderType = useOrderTypeStore((state) => state.orderType);
  const { user, logout } = useAuthStore((state) => state);

  const [promotionsEnabled, setPromotionsEnabled] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toast = useToastStore.getState();
  const userId = user?.uid;

  const handleTogglePromotions = async (value: boolean) => {
    setPromotionsEnabled(value);
    try {
      await updateNotificationPrefsInDb(userId, { promotions: value });
    } catch (error) {
      setPromotionsEnabled(!value);
      console.log('Something went wrong', error);
      toast.show({
        message: 'Something went wrong! Please try again',
        type: 'error',
      });
    }
  };

  const handleLogout = async () => {
    setShowLogoutModal(false);

    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);

      useToastStore.getState().show({
        message: 'Failed to log out. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-circle" size={60} color={theme.colors.primary} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{user?.firstName || 'Guest'}</Text>
          <Text style={styles.phone}>{user?.phone}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editLink}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Order type toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Type</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.btn, orderType === 'takeaway' && styles.btnActive]}
            onPress={() => setPickup()}>
            <Text style={styles.txt}>Takeaway</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.btn, orderType === 'delivery' && styles.btnActive]}
            onPress={() => navigation.navigate('AddressList')}>
            <Text style={styles.txt}>Delivery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu list */}
      <View style={styles.section}>
        <View style={styles.notificationRow}>
          <Text style={styles.rowLabel}>Promotional notifications</Text>
          <Switch
            thumbColor={theme.colors.primary}
            trackColor={{ false: theme.colors.border, true: theme.colors.borderFocus }}
            value={promotionsEnabled}
            onValueChange={handleTogglePromotions}
          />
        </View>

        <MenuRow
          label="Order History"
          onPress={() => navigation.navigate('MainTabs', { screen: 'OrderHistory' })}
        />

        <MenuRow
          label="Help & Support"
          onPress={() => navigation.navigate('Support', { phone: restaurantConfig.supportPhone })}
        />
        <MenuRow
          label="Terms of Service"
          onPress={() => Linking.openURL('https://akbars-darbar-legal-pages.vercel.app/terms.html')}
        />
        <MenuRow
          label="Privacy Policy"
          onPress={() =>
            Linking.openURL('https://akbars-darbar-legal-pages.vercel.app/privacy.html')
          }
        />
      </View>

      <LogoutConfirmModal
        visible={showLogoutModal}
        title="Log Out"
        message="Are you sure you want to log out?"
        confirmText="Log Out"
        destructive
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogoutModal(true)}>
        <Text style={styles.logoutTxt}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  phone: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  editLink: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.overlay,
    alignItems: 'center',
  },
  btnActive: {
    backgroundColor: theme.colors.primary,
  },
  txt: {
    color: '#fff',
    fontWeight: '500',
  },

  logoutBtn: {
    marginTop: 30,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e53935',
    alignItems: 'center',
  },
  logoutTxt: {
    color: '#e53935',
    fontWeight: '600',
  },

  notificationSection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    marginTop: 8,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  notificationRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  rowTextGroup: {
    flex: 1,
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  rowSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  alwaysOnBadge: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  alwaysOnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
});
