import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Text as RNText,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Input from "@components/ui/Input/Input";



export default function InputPreviewScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")



    return (
        <SafeAreaView style={styles.safe}>
            <StatusBar style="dark" />
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <RNText style={styles.heading}>Input Component</RNText>
                    <RNText style={styles.subheading}>All states and variants</RNText>
                </View>

                {/* Default */}
                <RNText style={styles.sectionTitle}>DEFAULT STATE</RNText>
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                {/* Password */}
                <RNText style={styles.sectionTitle}>PASSWORD ENTRY</RNText>
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {/* Error state */}
                <RNText style={styles.sectionTitle}>ERROR STATE</RNText>
                <Input
                    label="Email"
                    placeholder="Enter your email"
                    value="wrongemail"
                    onChangeText={() => { }}
                    error="Please enter a valid email address"
                />

                {/* Disabled */}
                <RNText style={styles.sectionTitle}>DISABLED</RNText>
                <Input
                    label="Phone"
                    placeholder="Enter your phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    disabled
                />



            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    container: {
        padding: 24,
        paddingBottom: 48,
        gap: 16,
    },
    header: {
        marginBottom: 8,
    },
    heading: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827",
    },
    subheading: {
        fontSize: 15,
        color: "#6B7280",
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginTop: 8,
    },
});