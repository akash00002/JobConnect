import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

const OPTIONS = [
  { label: "Full Time", value: "full_time", icon: "briefcase-outline" },
  { label: "Part Time", value: "part_time", icon: "time-outline" },
  { label: "Contract", value: "contract", icon: "document-text-outline" },
  { label: "Internship", value: "internship", icon: "school-outline" },
];

export default function JobTypeSelector({ value, onChange }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View className="flex-row flex-wrap gap-2.5">
      {OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className="rounded-2xl py-3.5 px-3.5 flex-row items-center"
            style={{
              width: "47.5%",
              borderWidth: 1.5,
              borderColor: isSelected
                ? colors.brandSecondary
                : isDark
                  ? colors.neutral700
                  : colors.neutral200,
              backgroundColor: isSelected
                ? colors.brandSecondary + "12"
                : colors.surface,
              gap: 10,
            }}
          >
            <View
              className="w-9 h-9 rounded-xl items-center justify-center"
              style={{
                backgroundColor: isSelected
                  ? colors.brandSecondary
                  : isDark
                    ? colors.neutral700
                    : colors.neutral100,
                flexShrink: 0,
              }}
            >
              <Ionicons
                name={option.icon}
                size={18}
                color={isSelected ? "#fff" : colors.neutral500}
              />
            </View>
            <Text
              className="flex-1 text-sm"
              style={{
                fontWeight: isSelected ? "600" : "500",
                color: isSelected ? colors.brandSecondary : colors.text,
              }}
            >
              {option.label}
            </Text>
            {isSelected && (
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={colors.brandSecondary}
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
