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

export default function SignupScreen() {
  const { startSignup } = useApp();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
        <Text style={[styles.title, { color: textPrimary }]}>
          Create Account
        </Text>
        <View style={[styles.phoneContainer, { backgroundColor: isDark ? "#111418" : "#F2F4F7", borderColor: border }]}>
          <Text style={[styles.countryCode, { color: textPrimary, borderRightColor: border }]}>+91</Text>
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
          secureTextEntry
          value={password}
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
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={textSecondary + "99"}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[
            styles.input,
            {
              borderColor: border,
              color: textPrimary,
              backgroundColor: isDark ? "#111418" : "#F2F4F7",
            },
          ]}
        />
        <Text style={[styles.info, { color: textSecondary }]}>
          We&apos;ll verify your phone number in the next step
        </Text>
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            {
              backgroundColor: accent,
              opacity:
                password && confirmPassword && password !== confirmPassword
                  ? 0.5
                  : 1,
            },
          ]}
          disabled={!phone || password !== confirmPassword}
          onPress={() => {
            if (password !== confirmPassword || !phone) {
              return;
            }
            // Pass a placeholder for the wallet address - no longer needed in our app flow
            startSignup("placeholder", phone, password);
            router.push("/auth/link-phone");
          }}
        >
          <Text style={styles.primaryText}>
            {!phone ? "Enter phone number" : 
              password !== confirmPassword ? "Passwords do not match" : "Continue"}
          </Text>
        </TouchableOpacity>
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
    fontSize: 38,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
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
    fontWeight: '600',
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
  info: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
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
