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
  const { colors, isDark } = useAppTheme();
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className="flex-1 rounded-2xl py-5 px-3 items-center"
      style={{
        backgroundColor: colors.surface,
        borderColor: isDark ? colors.neutral700 : colors.neutral100,
      }}
    >
      {/* Press effect only on icon */}
      <View
        className="w-12 h-12 rounded-full items-center justify-center mb-2.5"
        style={{
          backgroundColor: primary ? colors.brandSecondary : iconBgColor,
          shadowColor: primary ? colors.brandSecondary : "transparent",
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
        className="text-xs font-semibold text-center"
        style={{ color: colors.text }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
