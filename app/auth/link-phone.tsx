import { useApp } from "@/contexts/AppContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function LinkPhone() {
  const { phone, otpSent, sendOtp, verifyOtp } = useApp();
  const [code, setCode] = useState("");
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0E0F12" : "#F5F7FA";
  const card = isDark ? "#1C1F24" : "#ffffff";
  const textPrimary = isDark ? "#FFFFFF" : "#11181C";
  const textSecondary = isDark ? "#B5BCC6" : "#5A6470";
  const border = isDark ? "#2A2F36" : "#D0D7DF";
  const accent = "#5D3BEE";
  return (
    <View style={[styles.outer, { backgroundColor: bg }]}>
      <View
        style={[
          styles.container,
          { backgroundColor: card, shadowColor: isDark ? "#000" : "#5D3BEE" },
        ]}
      >
        <Text style={[styles.title, { color: textPrimary }]}>Verify Phone</Text>
        <Text style={[styles.subtitle, { color: textSecondary }]}>
          We will link {phone}
        </Text>
        {!otpSent && (
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: accent }]}
            onPress={sendOtp}
          >
            <Text style={styles.primaryText}>Send OTP</Text>
          </TouchableOpacity>
        )}
        {otpSent && (
          <>
            <TextInput
              placeholder="Enter 123456"
              placeholderTextColor={textSecondary + "99"}
              keyboardType="number-pad"
              value={code}
              onChangeText={setCode}
              style={[
                styles.input,
                {
                  borderColor: border,
                  color: textPrimary,
                  backgroundColor: isDark ? "#111418" : "#F2F4F7",
                },
              ]}
            />
            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: accent }]}
              onPress={() => {
                if (verifyOtp(code)) router.replace("/(tabs)");
              }}
            >
              <Text style={styles.primaryText}>Verify</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, padding: 24, justifyContent: "center" },
  container: {
    borderRadius: 28,
    padding: 28,
    gap: 22,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: { textAlign: "center", fontSize: 14 },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 8,
    textAlign: "center",
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
