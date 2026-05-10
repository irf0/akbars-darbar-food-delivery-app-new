import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text as RNText,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "./src/components/ui/Button/Button";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <RNText style={styles.sectionTitle}>{title}</RNText>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

export default function App() {
  const [loading, setLoading] = useState(false);

  const handleLoadingPress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <RNText style={styles.heading}>Button Component</RNText>
          <RNText style={styles.subheading}>All variants, sizes and states</RNText>
        </View>

        {/* Variants */}
        <Section title="Variants">
          <Button label="Solid" onPress={() => { }} variant="solid" fullWidth />
          <Button label="Outline" onPress={() => { }} variant="outline" fullWidth />
          <Button label="Ghost" onPress={() => { }} variant="ghost" fullWidth />
          <Button label="Danger" onPress={() => { }} variant="danger" fullWidth />
        </Section>

        {/* Sizes */}
        <Section title="Sizes">
          <Button label="Large Button" onPress={() => { }} size="lg" fullWidth />
          <Button label="Medium Button" onPress={() => { }} size="md" fullWidth />
          <Button label="Small Button" onPress={() => { }} size="sm" fullWidth />
        </Section>

        {/* States */}
        <Section title="States">
          <Button
            label="Tap to Load"
            onPress={handleLoadingPress}
            loading={loading}
            fullWidth
          />
          <Button label="Disabled" onPress={() => { }} disabled fullWidth />
        </Section>

        {/* Row */}
        <Section title="Inline Row">
          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Button label="Cancel" onPress={() => { }} variant="outline" />
            </View>
            <View style={styles.rowItem}>
              <Button label="Confirm" onPress={() => { }} variant="solid" />
            </View>
          </View>
        </Section>

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
    gap: 24,
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
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  sectionContent: {
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowItem: {
    flex: 1,
  },
});