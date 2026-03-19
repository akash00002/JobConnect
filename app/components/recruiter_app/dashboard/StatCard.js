import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function StatCard({
  icon,
  iconBgColor,
  iconColor,
  value,
  label,
  badge,
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="rounded-2xl p-4 mr-3"
      style={{
        minWidth: 152,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: isDark ? colors.neutral800 : colors.neutral100,
      }}
    >
      <View className="flex-row items-start justify-between mb-4">
        <View
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: iconBgColor }}
        >
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        {badge}
      </View>

      <Text
        className="text-3xl font-bold"
        style={{ color: colors.text, letterSpacing: -1 }}
      >
        {value}
      </Text>
      <Text
        className="text-xs font-medium mt-1"
        style={{ color: colors.textSecondary }}
      >
        {label}
      </Text>
    </View>
  );
}
