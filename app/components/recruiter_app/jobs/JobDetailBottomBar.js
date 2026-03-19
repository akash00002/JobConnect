import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobDetailBottomBar({
  totalApplicants,
  newApplicants,
  onReviewApplicants,
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="px-4 pt-4 pb-7 border-t"
      style={{
        backgroundColor: colors.surface,
        borderTopColor: isDark ? colors.neutral700 : colors.neutral200,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View>
          <Text
            className="text-sm font-semibold"
            style={{ color: colors.text }}
          >
            {newApplicants} New Applicants
          </Text>
          <Text
            className="text-xs mt-0.5"
            style={{ color: colors.textSecondary }}
          >
            {totalApplicants} total applications
          </Text>
        </View>

        <Pressable
          onPress={onReviewApplicants}
          className="flex-row items-center gap-2 px-5 py-3 rounded-xl active:opacity-80"
          style={{ backgroundColor: colors.brandSecondary }}
        >
          <Text className="text-sm font-bold text-white">
            Review Applicants
          </Text>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}
