import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobCard({
  onPress,
  job,
  onEdit,
  onViewApplicants,
  navigation,
}) {
  const { colors, isDark } = useAppTheme();
  const hasNewApplicants = job.newApplicants > 0;

  const formatLabel = (val) => {
    if (!val) return "";
    return val.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <TouchableOpacity
      className="rounded-2xl overflow-hidden mb-3"
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: isDark ? colors.neutral700 : colors.neutral200,
      }}
      onPress={onPress}
    >
      <View className="p-4">
        {/* Top row: badge + edit */}
        <View className="flex-row items-center justify-between mb-3">
          <View
            className="flex-row items-center gap-1 px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: hasNewApplicants
                ? colors.successBg
                : colors.neutral100,
            }}
          >
            {hasNewApplicants && (
              <Ionicons name="people" size={12} color={colors.successIcon} />
            )}
            <Text
              className="text-xs font-semibold"
              style={{
                color: hasNewApplicants
                  ? colors.successText
                  : colors.textSecondary,
              }}
            >
              {hasNewApplicants
                ? `${job.newApplicants} New Applicants`
                : "No New Applicants"}
            </Text>
          </View>

          <Pressable
            onPress={onEdit}
            className="w-8 h-8 rounded-full items-center justify-center"
            style={({ pressed }) => ({
              backgroundColor: pressed ? colors.neutral100 : "transparent",
            })}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>

        {/* Job title */}
        <Text className="text-xl font-bold mb-1" style={{ color: colors.text }}>
          {job.title}
        </Text>

        {/* Location + work mode + job type */}
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          {[job.location, formatLabel(job.workMode), formatLabel(job.jobType)]
            .filter(Boolean)
            .join(" • ")}
        </Text>

        {/* Bottom row: total applicants + button */}
        <View className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center gap-1">
            <Ionicons
              name="people-outline"
              size={16}
              color={colors.textSecondary}
            />
            <Text
              className="text-sm font-medium"
              style={{ color: colors.textSecondary }}
            >
              {job.applicants} Total Applicants
            </Text>
          </View>

          <TouchableOpacity
            onPress={onViewApplicants}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: colors.brandSecondary }}
          >
            <Text className="text-xs font-bold text-white">
              View Applicants
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
