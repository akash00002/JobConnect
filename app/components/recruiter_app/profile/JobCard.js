import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobCard({
  title,
  type,
  location,
  newCount,
  newCountColor,
}) {
  const { colors, isDark } = useAppTheme();
  return (
    <View
      className="p-4 rounded-2xl border"
      style={{
        backgroundColor: colors.surface,
        borderColor: isDark ? colors.neutral700 : colors.neutral100,
      }}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-base font-bold" style={{ color: colors.text }}>
            {title}
          </Text>
          <Text
            className="text-xs mt-0.5"
            style={{ color: colors.textSecondary }}
          >
            {type} • {location}
          </Text>
        </View>
        <View
          className="px-2 py-1 rounded"
          style={{
            backgroundColor:
              newCountColor === "green" ? "#16a34a20" : "#4f46e520",
          }}
        >
          <Text
            className="text-xs font-bold"
            style={{
              color:
                newCountColor === "green" ? "#16a34a" : colors.brandSecondary,
            }}
          >
            {newCount} NEW
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row">
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: isDark ? colors.neutral700 : colors.neutral200,
                borderWidth: 2,
                borderColor: colors.surface,
                marginLeft: i === 1 ? 0 : -8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {i === 3 ? (
                <Text
                  className="text-xs font-bold"
                  style={{ color: colors.textSecondary }}
                >
                  +8
                </Text>
              ) : (
                <Ionicons name="person" size={12} color={colors.neutral400} />
              )}
            </View>
          ))}
        </View>
        <TouchableOpacity
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: `${colors.brandSecondary}15` }}
        >
          <Text
            className="text-xs font-bold"
            style={{ color: colors.brandSecondary }}
          >
            View Applicants
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
