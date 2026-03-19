import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobsEmptyState({ search, activeTab, onPostJob }) {
  const { colors } = useAppTheme();

  return (
    <View className="items-center justify-center py-20">
      <Ionicons name="briefcase-outline" size={48} color={colors.neutral300} />
      <Text
        className="text-base font-semibold mt-4"
        style={{ color: colors.textSecondary }}
      >
        {search ? "No jobs match your search" : `No ${activeTab} jobs yet`}
      </Text>
      {!search && activeTab === "active" && (
        <Pressable
          onPress={onPostJob}
          className="mt-4 px-6 py-3 rounded-xl"
          style={{ backgroundColor: colors.brandSecondary }}
        >
          <Text className="text-sm font-bold text-white">Post a Job</Text>
        </Pressable>
      )}
    </View>
  );
}
