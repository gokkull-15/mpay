import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function PaymentSuccess() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0B0D10" : "#FFFFFF";
  const textPrimary = isDark ? "#FFFFFF" : "#11181C";
  const textSecondary = isDark ? "#B5BCC6" : "#5A6470";
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={styles.circle}>
        <IconSymbol name="checkmark.seal.fill" size={80} color="#fff" />
      </View>
      <Text style={[styles.title, { color: textPrimary }]}>Done</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>
        Transaction completed
      </Text>
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => router.replace("/(tabs)")}
      >
        <Text style={styles.primaryText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 18,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#34C759",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#34C759",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  title: { fontSize: 36, fontWeight: "800" },
  subtitle: { fontSize: 14 },
  primaryBtn: {
    backgroundColor: "#5D3BEE",
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 8,
  },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
