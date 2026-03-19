import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

const formatLabel = (val) => {
  if (!val) return "";
  return val.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const formatSalary = (min, max) => {
  if (!min && !max) return null;
  const fmt = (n) => `$${Number(n).toLocaleString()}`;
  if (min && max) return `${fmt(min)} - ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max)}`;
};

export default function JobDetailTitleCard({ job }) {
  const { colors } = useAppTheme();

  const isActive = job.status === "active";
  const salary = formatSalary(
    job.salaryMin ?? job.salary_min,
    job.salaryMax ?? job.salary_max,
  );
  const workMode = formatLabel(job.workMode ?? job.work_mode);
  const jobType = formatLabel(job.jobType ?? job.job_type);

  return (
    <View
      className="rounded-2xl p-5 mb-4 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.neutral200,
      }}
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1 mr-3">
          <Text
            className="text-2xl font-bold mb-1"
            style={{ color: colors.text }}
          >
            {job.title}
          </Text>
          {job.category && (
            <Text className="text-base" style={{ color: colors.textSecondary }}>
              {formatLabel(job.category)}
            </Text>
          )}
        </View>

        {/* Status badge */}
        <View
          className="px-3 py-1.5 rounded-full border"
          style={{
            backgroundColor: isActive ? colors.successBg : colors.neutral100,
            borderColor: isActive
              ? colors.successIcon + "50"
              : colors.neutral200,
          }}
        >
          <Text
            className="text-xs font-bold uppercase tracking-wider"
            style={{
              color: isActive ? colors.successText : colors.textSecondary,
            }}
          >
            {job.status}
          </Text>
        </View>
      </View>

      {/* Meta row */}
      <View className="flex-row flex-wrap gap-3">
        {job.location && (
          <View className="flex-row items-center gap-1">
            <Ionicons
              name="location-outline"
              size={14}
              color={colors.textSecondary}
            />
            <Text className="text-sm" style={{ color: colors.textSecondary }}>
              {job.location}
            </Text>
          </View>
        )}
        {workMode && (
          <View className="flex-row items-center gap-1">
            <Ionicons
              name="home-outline"
              size={14}
              color={colors.textSecondary}
            />
            <Text className="text-sm" style={{ color: colors.textSecondary }}>
              {workMode}
            </Text>
          </View>
        )}
        {jobType && (
          <View className="flex-row items-center gap-1">
            <Ionicons
              name="time-outline"
              size={14}
              color={colors.textSecondary}
            />
            <Text className="text-sm" style={{ color: colors.textSecondary }}>
              {jobType}
            </Text>
          </View>
        )}
        {salary && (
          <View className="flex-row items-center gap-1">
            <Ionicons
              name="cash-outline"
              size={14}
              color={colors.textSecondary}
            />
            <Text className="text-sm" style={{ color: colors.textSecondary }}>
              {salary}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
