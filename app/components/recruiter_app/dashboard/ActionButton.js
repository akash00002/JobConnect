import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function ActionButton({
  icon,
  label,
  iconBgColor,
  iconColor,
  primary,
  onPress,
}) {
  const { colors } = useAppTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        flex: 1,
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 12,
        alignItems: "center",
        backgroundColor: colors.surface,
      }}
    >
      {/* Press effect only on icon */}
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
          backgroundColor: primary ? colors.brandPrimary : iconBgColor,
          shadowColor: primary ? colors.brandPrimary : "transparent",
          shadowOpacity: primary ? 0.3 : 0,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: primary ? 6 : 0,
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.9 : 1 }],
        }}
      >
        <Ionicons name={icon} size={22} color={primary ? "#fff" : iconColor} />
      </View>

      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          textAlign: "center",
          color: colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
