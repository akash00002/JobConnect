// components/onboarding/ExperienceCard.js
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useAppTheme } from "../../utils/theme";
import TouchableScale from "../common/TouchableScale";

export default function ExperienceCard({
  experience,
  onEdit,
  onDelete,
  iconName,
}) {
  const { colors, isDark } = useAppTheme();

  const formatDate = (date) => {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  return (
    <View
      className="rounded-2xl border p-4 mb-4 flex-row items-start gap-5"
      style={{
        backgroundColor: colors.surface,
        borderColor: isDark ? colors.neutral700 : colors.neutral200,
      }}
    >
      <View
        className="w-14 h-14 items-center mt-2 justify-center rounded-xl"
        style={{
          backgroundColor: isDark ? colors.neutral800 : colors.neutral200,
        }}
      >
        <Ionicons name={iconName} size={20} color={colors.brandPrimary} />
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text
              className="text-lg font-semibold"
              style={{ color: colors.text }}
            >
              {experience.jobTitle}
            </Text>
            <Text
              className="text-sm font-medium  mb-2"
              style={{ color: colors.neutral600 }}
            >
              {experience.companyName}
            </Text>
            <Text className="text-xs" style={{ color: colors.textSecondary }}>
              {formatDate(experience.startDate)} -{" "}
              {experience.isPresent
                ? "PRESENT"
                : formatDate(experience.endDate)}
            </Text>
          </View>

          <View className="flex gap-2">
            <TouchableScale
              onPress={onEdit}
              className="w-8 h-8 items-center justify-center rounded-lg"
            >
              <Ionicons
                name="pencil-sharp"
                size={20}
                color={colors.neutral500}
              />
            </TouchableScale>

            <TouchableScale
              onPress={onDelete}
              className="w-8 h-8 items-center justify-center rounded-lg"
            >
              <Ionicons name="trash-sharp" size={20} color={colors.error} />
            </TouchableScale>
          </View>
        </View>
      </View>
    </View>
  );
}
