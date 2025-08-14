import { useApp } from "@/contexts/AppContext";
import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function ReceiveScreen() {
  const { phone, addMockReceive } = useApp();
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0B0D10" : "#FFFFFF";
  const card = isDark ? "#151B21" : "#F5F7FA";
  const textPrimary = isDark ? "#FFFFFF" : "#11181C";
  const textSecondary = isDark ? "#B5BCC6" : "#5A6470";
  const accent = "#5D3BEE";
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: textPrimary }]}>Receive</Text>
      
      <View style={[styles.card, { backgroundColor: card }]}>
        <Text style={[styles.label, { color: textSecondary }]}>
          Your Mobile Number
        </Text>
        <Text selectable style={[styles.addr, { color: textPrimary }]}>
          +1 {phone}
        </Text>
      </View>
      
      {/* QR code placeholder */}
      <View style={[styles.qrContainer, { borderColor: isDark ? '#333' : '#E0E0E0' }]}>
        <View style={styles.qrPlaceholder}>
          <Text style={[styles.qrText, { color: textSecondary }]}>
            QR Code to receive payments
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={[styles.primaryBtn, { backgroundColor: accent }]}
        onPress={() => {
          addMockReceive(0.05, "ETH", "Friend");
          router.push("/payment-success");
        }}
      >
        <Text style={styles.primaryText}>Simulate Receive 0.05 ETH</Text>
      </TouchableOpacity>
      <Text style={{ color: textSecondary, fontSize: 12, textAlign: 'center' }}>
        Share your phone number or QR code to receive payments
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 20 },
  title: { fontSize: 30, fontWeight: "700", marginTop: 8 },
  card: { padding: 16, borderRadius: 20 },
  label: { fontSize: 14, marginBottom: 4 },
  addr: { fontFamily: "SpaceMono", fontSize: 18 },
  qrContainer: { 
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  qrText: {
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 14,
  },
  primaryBtn: { padding: 18, borderRadius: 18, alignItems: "center" },
  primaryText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
