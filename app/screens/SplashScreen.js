import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";

export default function SplashScreen({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.5,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const timer = setTimeout(() => {
      onFinish?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish, pulseAnim, spinAnim, translateY]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark items-center justify-between px-6 py-8 overflow-hidden">
      {/* Background Blobs
      <View className="absolute top-[-100px] right-[-80px] w-[350px] h-[350px] rounded-full bg-brand-primary/5" />
      <View className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-brand-primary/10" /> */}

      {/* Top Spacer */}
      <View className="flex-1" />

      {/* Central Branding */}
      <Animated.View
        className="items-center justify-center"
        style={{ opacity: fadeAnim, transform: [{ translateY }] }}
      >
        {/* Logo Wrapper */}
        <View className="relative items-center justify-center mb-8">
          {/* Glow */}
          {/* <View className="absolute w-[130px] h-[130px] rounded-3xl bg-brand-primary/20" /> */}

          {/* Logo Box */}
          <View className="w-28 h-28 rounded-3xl bg-brand-primary items-center justify-center shadow-glow">
            <MaterialIcons name="business-center" size={56} color="#fff" />
          </View>

          {/* Badge */}
          <View className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-surface-light dark:bg-surface-dark items-center justify-center shadow-soft">
            <MaterialIcons name="check" size={14} color="#135bec" />
          </View>
        </View>

        {/* App Name */}
        <Text className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-2">
          Job<Text className="text-brand-primary">Connect</Text>
        </Text>

        {/* Tagline */}
        <Text className="text-base font-medium tracking-wide text-neutral-400">
          Find your future
        </Text>
      </Animated.View>

      {/* Bottom Loading Section */}
      <View className="flex-1 items-center justify-end pb-8">
        {/* Spinner */}
        <View className="w-12 h-12 items-center justify-center mb-4">
          {/* Track */}
          <View className="absolute w-12 h-12 rounded-full border-[3px] border-neutral-200 dark:border-neutral-800" />
          {/* Spinning arc */}
          <Animated.View
            className="absolute w-12 h-12 rounded-full border-[3px] border-brand-primary"
            style={{
              transform: [{ rotate: spin }],
              borderTopColor: "transparent",
              borderRightColor: "transparent",
              borderBottomColor: "transparent",
            }}
          />
        </View>

        {/* Loading Text */}
        <Animated.Text
          className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500"
          style={{ opacity: pulseAnim }}
        >
          LOADING...
        </Animated.Text>
      </View>

      {/* Version */}
      <Text className="absolute bottom-4 text-[10px] text-neutral-200 dark:text-neutral-700">
        v1.0
      </Text>
    </View>
  );
}
