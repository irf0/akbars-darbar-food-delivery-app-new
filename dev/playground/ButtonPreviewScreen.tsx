import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Text as RNText,
} from "react-native";
import { Button } from '@components/ui/Button/Button';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
        <RNText style={styles.sectionTitle}>{title}</RNText>
        <View style={styles.sectionContent}>{children}</View>
    </View>
);

const ButtonPreviewScreen = () => {
    const [loading, setLoading] = useState(false);

    const handleLoadingPress = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Visual Header Context */}
                <View style={styles.header}>
                    <RNText style={styles.heading}>Button Lab</RNText>
                    <RNText style={styles.subheading}>Interactive design tokens & states reference</RNText>
                </View>

                {/* 1. Component Variants Section */}
                <Section title="Variants">
                    <Button label="Solid" onPress={() => { }} variant="solid" fullWidth />
                    <Button label="Outline" onPress={() => { }} variant="outline" fullWidth />
                    <Button label="Ghost" onPress={() => { }} variant="ghost" fullWidth />
                    <Button label="Danger" onPress={() => { }} variant="danger" fullWidth />
                </Section>

                {/* 2. Sizing Scaling Section */}
                <Section title="Sizes">
                    <Button label="Large Button" onPress={() => { }} size="lg" fullWidth />
                    <Button label="Medium Button" onPress={() => { }} size="md" fullWidth />
                    <Button label="Small Button" onPress={() => { }} size="sm" fullWidth />
                </Section>

                {/* 3. Operational Interaction States Section */}
                <Section title="States">
                    <Button
                        label="Tap to Load"
                        onPress={handleLoadingPress}
                        loading={loading}
                        fullWidth
                    />
                    <Button label="Disabled" onPress={() => { }} disabled fullWidth />
                </Section>

                {/* 4. Structural Flex Row Testing Section */}
                <Section title="Inline Row">
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <Button label="Cancel" onPress={() => { }} variant="outline" fullWidth />
                        </View>
                        <View style={styles.rowItem}>
                            <Button label="Confirm" onPress={() => { }} variant="solid" fullWidth />
                        </View>
                    </View>
                </Section>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ButtonPreviewScreen;

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    container: {
        padding: 24,
        paddingBottom: 48,
    },
    header: {
        marginBottom: 24,
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
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#9CA3AF",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 12,
    },
    sectionContent: {
        gap: 12, // Provides beautiful standard uniform vertical spacing between items
    },
    row: {
        flexDirection: 'row',
        gap: 12, // Provides uniform horizontal spacing between row segments
        width: '100%',
    },
    rowItem: {
        flex: 1, // Forces both nested containers to stretch to exact equal width halves
    },
});
