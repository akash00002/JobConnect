import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

const OPTIONS = [
  { label: "Remote", value: "remote", icon: "home-outline" },
  { label: "On-site", value: "onsite", icon: "business-outline" },
  { label: "Hybrid", value: "hybrid", icon: "git-merge-outline" },
];

export default function WorkModeSelector({ value, onChange }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View className="flex-row gap-2.5">
      {OPTIONS.map((option) => {
        const isSelected = value === option.value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className="flex-1 rounded-2xl py-3.5 items-center"
            style={{
              borderWidth: 1.5,
              borderColor: isSelected
                ? colors.brandSecondary
                : isDark
                  ? colors.neutral700
                  : colors.neutral200,
              backgroundColor: isSelected
                ? colors.brandSecondary + "12"
                : colors.surface,
            }}
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mb-2"
              style={{
                backgroundColor: isSelected
                  ? colors.brandSecondary
                  : isDark
                    ? colors.neutral700
                    : colors.neutral100,
              }}
            >
              <Ionicons
                name={option.icon}
                size={20}
                color={isSelected ? "#fff" : colors.neutral500}
              />
            </View>
            <Text
              className="text-sm"
              style={{
                fontWeight: isSelected ? "600" : "500",
                color: isSelected ? colors.brandSecondary : colors.text,
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
