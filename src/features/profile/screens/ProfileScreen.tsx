import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { theme } from '@theme';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@features/auth/store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { AppStackParamList } from '@navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type ParentNavigationProp = NativeStackNavigationProp<AppStackParamList>;


export default function ProfileScreen() {
    const navigation = useNavigation<ParentNavigationProp>()
    const { user, logout } = useAuthStore();
    const activeTheme = theme
    const { colors, spacing, radius, fontSize, fontWeight } = activeTheme;

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => logout()


                }
            ]
        );
    };

    return (
        <SafeAreaView>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <View style={[styles.avatar, { backgroundColor: colors.surfaceAlt }]}>
                        <Ionicons name="person" size={40} color={colors.primary} />
                    </View>
                    <Text style={[styles.phone, { color: colors.text }]}>
                        +91 {user?.phone || 'User'}
                    </Text>
                </View>

                <View style={styles.menu}>
                    <TouchableOpacity
                        style={[styles.logoutButton, { borderColor: colors.error }]}
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={20} color={colors.error} />
                        <Text style={[styles.logoutText, { color: colors.error }]}>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    devBox: { marginTop: 32, borderTopWidth: 1, borderColor: '#e5e7eb', paddingTop: 16 },
    container: { flex: 1, padding: 20 },
    header: { alignItems: 'center', marginTop: 40, marginBottom: 40 },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    phone: { fontSize: 20, fontWeight: '700' },
    menu: { flex: 1, justifyContent: 'flex-end', marginBottom: 20 },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 14,
        borderRadius: 12
    },
    logoutText: { marginLeft: 8, fontWeight: '600', fontSize: 16 }
});
