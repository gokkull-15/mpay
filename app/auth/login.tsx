import { useApp } from "@/contexts/AppContext";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function LoginScreen() {
  const { login } = useApp();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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
        <Text style={[styles.title, { color: textPrimary }]}>mPay</Text>
        <Text style={[styles.subtitle, { color: textSecondary }]}>
          Login to your account
        </Text>
        <View style={[
          styles.phoneContainer,
          {
            borderColor: border,
            backgroundColor: isDark ? "#111418" : "#F2F4F7",
          }
        ]}>
          <Text style={[
            styles.countryCode, 
            { 
              color: textPrimary,
              borderRightColor: isDark ? '#2A2F36' : '#E0E0E0',
            }
          ]}>+91</Text>
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor={textSecondary + "99"}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={[
              styles.phoneInput,
              { color: textPrimary },
            ]}
          />
        </View>
        <TextInput
          placeholder="Password"
          placeholderTextColor={textSecondary + "99"}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
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
            // For login, we use the phone number directly
            // Note: We pass a placeholder wallet address to maintain backward compatibility with the context
            if (login("placeholder", password)) router.replace("/(tabs)");
          }}
        >
          <Text style={styles.primaryText}>Login</Text>
        </TouchableOpacity>
        <Link href="/auth/signup" asChild>
          <TouchableOpacity style={styles.linkBtn}>
            <Text style={[styles.linkText, { color: accent }]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, padding: 24, justifyContent: "center" },
  container: {
    borderRadius: 28,
    padding: 28,
    gap: 18,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 28,
    elevation: 4,
  },
  title: {
    fontSize: 44,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 1,
  },
  subtitle: { textAlign: "center", fontSize: 14, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    fontSize: 16,
    fontWeight: "500",
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRightWidth: 1,
  },
  phoneInput: {
    flex: 1,
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
  linkBtn: { padding: 4 },
  linkText: { textAlign: "center", fontWeight: "600", fontSize: 15 },
});
