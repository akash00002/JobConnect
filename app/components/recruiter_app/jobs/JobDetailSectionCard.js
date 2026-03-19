import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobDetailSectionCard({ icon, title, children }) {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-2xl p-5 mb-4 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.neutral200,
      }}
    >
      <View className="flex-row items-center gap-2 mb-4">
        <View
          className="w-8 h-8 rounded-lg items-center justify-center"
          style={{ backgroundColor: colors.brandSecondary + "15" }}
        >
          <Ionicons name={icon} size={18} color={colors.brandSecondary} />
        </View>
        <Text className="text-lg font-bold" style={{ color: colors.text }}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
}
