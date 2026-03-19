import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

const TABS = [
  { key: "active", label: "Active" },
  { key: "closed", label: "Closed" },
];

export default function JobsTabs({ activeTab, onTabChange, counts }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="flex-row px-4 border-b"
      style={{
        backgroundColor: colors.surface,
        borderBottomColor: isDark ? colors.neutral800 : colors.neutral200,
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className="mr-6 py-3"
            style={{
              borderBottomWidth: 2,
              borderBottomColor: isActive
                ? colors.brandSecondary
                : "transparent",
            }}
          >
            <Text
              className="text-sm font-semibold"
              style={{
                color: isActive ? colors.brandSecondary : colors.textSecondary,
              }}
            >
              {tab.label} ({counts[tab.key]})
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
