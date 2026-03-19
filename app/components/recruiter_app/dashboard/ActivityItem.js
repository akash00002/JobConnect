import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function ActivityItem({
  avatarUri,
  badgeBgColor,
  badgeIcon,
  title,
  subtitle,
  isLast,
  isWarning,
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="flex-row items-center gap-3 px-4 py-3.5"
      style={
        !isLast
          ? {
              borderBottomWidth: 1,
              borderBottomColor: isDark ? colors.neutral700 : colors.neutral100,
            }
          : undefined
      }
    >
      <View style={{ position: "relative" }}>
        {isWarning ? (
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.warningBg }}
          >
            <Ionicons
              name="warning-outline"
              size={20}
              color={colors.warningIcon}
            />
          </View>
        ) : (
          <>
            <Image
              source={{ uri: avatarUri }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
            {badgeIcon && badgeBgColor && (
              <View
                className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full items-center justify-center"
                style={{
                  backgroundColor: badgeBgColor,
                  borderWidth: 2,
                  borderColor: colors.surface,
                }}
              >
                <Ionicons name={badgeIcon} size={10} color="#fff" />
              </View>
            )}
          </>
        )}
      </View>

      <View className="flex-1 min-w-0">
        <Text
          className="text-sm font-medium"
          style={{ color: colors.text }}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          className="text-xs mt-0.5"
          style={{ color: colors.textSecondary }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
