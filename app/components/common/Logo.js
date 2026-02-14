import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function Logo() {
  return (
    <View className="w-16 h-16 bg-brand-primary rounded-2xl items-center justify-center mb-6 shadow-glow">
      <Ionicons name="briefcase-outline" size={32} color="#ffffff" />
    </View>
  );
}
