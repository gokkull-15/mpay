import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

import { AppProvider, useApp } from "@/contexts/AppContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useRef } from "react";

function RootNavigator() {
  const { isReady, isAuthenticated } = useApp();
  const router = useRouter();
  const segments = useSegments();
  const redirectedRef = useRef(false);

  // Ensure unauthenticated users always land on login first.
  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      const inAuthFlow = segments[0] === "auth";
      if (!inAuthFlow) {
        // Prevent multiple rapid redirects
        if (!redirectedRef.current) {
          redirectedRef.current = true;
          router.replace("/auth/login");
        }
      } else {
        redirectedRef.current = false;
      }
    } else {
      redirectedRef.current = false;
    }
  }, [isReady, isAuthenticated, segments, router]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack initialRouteName={isAuthenticated ? "(tabs)" : "auth/login"}>
      {/* Auth Flow */}
      {!isAuthenticated && (
        <>
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen
            name="auth/signup"
            options={{ title: "Create Account" }}
          />
          <Stack.Screen
            name="auth/link-phone"
            options={{ title: "Link Mobile" }}
          />
        </>
      )}
      {/* App Tabs */}
      {isAuthenticated && (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      {/* Payment Flow Screens */}
      {isAuthenticated && (
        <>
          <Stack.Screen name="send" options={{ title: "Send Crypto" }} />
          <Stack.Screen name="receive" options={{ title: "Receive" }} />
          <Stack.Screen name="scan" options={{ title: "Scan QR" }} />
          <Stack.Screen
            name="payment-success"
            options={{ presentation: "modal", title: "Success" }}
          />
        </>
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AppProvider>
  );
}
