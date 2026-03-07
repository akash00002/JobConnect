import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useAppTheme } from "../../utils/theme";

export default function ProfileName({
  name,
  jobTitle,
  location,
  variant = "candidate",
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <View className="items-center gap-1">
      {/* Alex Johnson */}
      {name && (
        <Text className="text-3xl font-bold" style={{ color: colors.text }}>
          {name}
        </Text>
      )}

      {/* Senior Product Designer */}
      {jobTitle && (
        <Text
          className="text-lg font-semibold"
          style={{ color: colors.textSecondary }}
        >
          {jobTitle}
        </Text>
      )}

      {/* San Francisco, CA */}
      {location && (
        <View className="flex-row items-center justify-center gap-1">
          <Ionicons
            name="location"
            size={16}
            color={isDark ? colors.neutral500 : colors.neutral400}
          />
          <Text
            className="text-base font-medium"
            style={{ color: isDark ? colors.neutral500 : colors.neutral400 }}
          >
            {location}
          </Text>
        </View>
      )}
    </View>
  );
}
