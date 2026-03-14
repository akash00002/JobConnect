import { Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function StatCard({ label, value, highlight }) {
  const { colors, isDark } = useAppTheme();
  return (
    <View
      className="flex-1 p-4 rounded-2xl border gap-1"
      style={{
        backgroundColor: colors.surface,
        borderColor: isDark ? colors.neutral700 : colors.neutral100,
      }}
    >
      <Text
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: colors.textSecondary }}
      >
        {label}
      </Text>
      <Text
        className="text-2xl font-bold"
        style={{ color: highlight ? colors.brandSecondary : colors.text }}
      >
        {value}
      </Text>
    </View>
  );
}
