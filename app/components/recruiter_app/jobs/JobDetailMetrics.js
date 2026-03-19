import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobDetailMetrics({ totalApplicants, newApplicants }) {
  const { colors } = useAppTheme();

  return (
    <View className="flex-row gap-3 mb-4">
      <View
        className="flex-1 rounded-2xl p-4 border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.neutral200,
        }}
      >
        <Text
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: colors.textSecondary }}
        >
          Total Applicants
        </Text>
        <Text
          className="text-3xl font-bold"
          style={{ color: colors.brandSecondary }}
        >
          {totalApplicants}
        </Text>
      </View>

      <View
        className="flex-1 rounded-2xl p-4 border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.neutral200,
        }}
      >
        <Text
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: colors.textSecondary }}
        >
          New Applicants
        </Text>
        <View className="flex-row items-end gap-2">
          <Text
            className="text-3xl font-bold"
            style={{ color: colors.successText }}
          >
            {newApplicants}
          </Text>
          {newApplicants > 0 && (
            <Ionicons
              name="trending-up"
              size={16}
              color={colors.successIcon}
              style={{ marginBottom: 6 }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
