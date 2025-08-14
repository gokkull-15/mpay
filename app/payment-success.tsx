import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated,
  Easing,
} from "react-native";
import Svg, { Path, Circle, G } from "react-native-svg";

export default function PaymentSuccess() {
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0B0D10" : "#FFFFFF";
  const textPrimary = isDark ? "#FFFFFF" : "#11181C";
  const textSecondary = isDark ? "#B5BCC6" : "#5A6470";
  
  // Animation values
  const containerScale = useRef(new Animated.Value(0.8)).current;
  const containerOpacity = useRef(new Animated.Value(0)).current;
  
  // Circle animation values
  const circleScale = useRef(new Animated.Value(0)).current;
  const circleOpacity = useRef(new Animated.Value(0)).current;
  
  // Ripple effect values
  const rippleScale = useRef(new Animated.Value(0.6)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  
  // Tick animation values
  const tickStrokeAnimation = useRef(new Animated.Value(0)).current;
  const tickPathLength = 100; // Approx length of the tick path
  
  // Animation interpolations for SVG
  const tickStrokeLength = tickStrokeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [tickPathLength, 0]
  });
  
  // Success message animation
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;
  
  useEffect(() => {
    // Reset animation values
    containerScale.setValue(0.8);
    containerOpacity.setValue(0);
    circleScale.setValue(0);
    circleOpacity.setValue(0);
    rippleScale.setValue(0.6);
    rippleOpacity.setValue(0);
    tickStrokeAnimation.setValue(0);
    textOpacity.setValue(0);
    textTranslateY.setValue(20);
    
    // Start with container fade in
    Animated.timing(containerOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Start animations in sequence
    Animated.sequence([
      // Initial bounce of the container
      Animated.timing(containerScale, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      
      // Show the main circle with a nice pop
      Animated.parallel([
        Animated.timing(circleOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(circleScale, {
          toValue: 1,
          duration: 600,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
      ]),
      
      // Slight delay before check animation
      Animated.delay(100),
      
      // Show the ripple effect and animate tick simultaneously
      Animated.parallel([
        // Ripple effect
        Animated.sequence([
          Animated.timing(rippleOpacity, {
            toValue: 0.4,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(rippleScale, {
            toValue: 1.2,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        
        // Tick drawing animation
        Animated.timing(tickStrokeAnimation, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      
      // Finally, show the text with a slight animation
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    containerScale, 
    containerOpacity, 
    circleScale, 
    circleOpacity, 
    rippleScale, 
    rippleOpacity, 
    tickStrokeAnimation, 
    textOpacity, 
    textTranslateY
  ]);
  
  // Create animated components
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedG = Animated.createAnimatedComponent(G);
  
  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Animated.View 
        style={[
          styles.animationContainer,
          {
            opacity: containerOpacity,
            transform: [{ scale: containerScale }]
          }
        ]}
      >
        <Svg width={240} height={240} viewBox="0 0 100 100">
          {/* Ripple effect */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r="50"
            fill="#1A73E8"
            opacity={rippleOpacity}
            scale={rippleScale}
          />
          
          {/* Main circle background */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r="46"
            fill="#1A73E8"
            opacity={circleOpacity}
            scale={circleScale}
          />
          
          {/* Animated checkmark with glow effect */}
          <AnimatedG opacity={tickStrokeAnimation}>
            {/* Glow effect - slightly larger stroke underneath */}
            <Path
              d="M25,55 L45,75 L75,30"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.5"
            />
            
            {/* Main check mark */}
            <AnimatedPath
              d="M25,55 L45,75 L75,30"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={tickPathLength}
              strokeDashoffset={tickStrokeLength}
            />
          </AnimatedG>
        </Svg>
      </Animated.View>
      
      <Animated.View style={{ 
        opacity: textOpacity, 
        transform: [{ translateY: textTranslateY }],
        alignItems: 'center' 
      }}>
        <Text style={[styles.title, { color: textPrimary }]}>Payment Successful</Text>
        <Text style={[styles.subtitle, { color: textSecondary }]}>
          Your transaction has been completed
        </Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.primaryText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 22,
  },
  animationContainer: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#1A73E8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  title: { 
    fontSize: 32, 
    fontWeight: "700", 
    marginTop: 10,
    letterSpacing: 0.5,
  },
  subtitle: { 
    fontSize: 18, 
    textAlign: "center", 
    marginHorizontal: 40,
    marginTop: 6,
    opacity: 0.9,
  },
  primaryBtn: {
    backgroundColor: "#1A73E8", // Google blue color
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 28,
    marginTop: 26,
    shadowColor: "#1A73E8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryText: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
