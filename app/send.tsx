import { useApp } from "@/contexts/AppContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function SendScreen() {
  const { sendPayment } = useApp();
  const [dest, setDest] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submit = async () => {
    setLoading(true);
    await sendPayment(dest, parseFloat(amount) || 0, "ETH");
    setLoading(false);
    router.replace("/payment-success");
  };
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0B0D10" : "#FFFFFF";
  const card = isDark ? "#151B21" : "#F5F7FA";
  const textPrimary = isDark ? "#FFFFFF" : "#11181C";
  const textSecondary = isDark ? "#B5BCC6" : "#5A6470";
  const border = isDark ? "#2A323A" : "#D0D7DF";
  const accent = "#5D3BEE";
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: textPrimary }]}>Send Crypto</Text>
      <TextInput
        placeholder="Phone or Wallet"
        placeholderTextColor={textSecondary + "99"}
        value={dest}
        onChangeText={setDest}
        style={[
          styles.input,
          { borderColor: border, color: textPrimary, backgroundColor: card },
        ]}
      />
      <TextInput
        placeholder="Amount (ETH)"
        placeholderTextColor={textSecondary + "99"}
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
        style={[
          styles.input,
          { borderColor: border, color: textPrimary, backgroundColor: card },
        ]}
      />
      <TouchableOpacity
        style={[
          styles.primaryBtn,
          { backgroundColor: accent, opacity: loading ? 0.7 : 1 },
        ]}
        disabled={loading}
        onPress={submit}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryText}>Send</Text>
        )}
      </TouchableOpacity>
      <Text style={{ color: textSecondary, fontSize: 12 }}>
        Demo only – no real funds move.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 18 },
  title: { fontSize: 30, fontWeight: "700", marginTop: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  primaryBtn: {
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 4,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
