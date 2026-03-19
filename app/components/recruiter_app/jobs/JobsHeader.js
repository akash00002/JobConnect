import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobsHeader({ onPostJob }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="flex-row items-center justify-between px-4 py-3 border-b"
      style={{
        backgroundColor: colors.surface,
        borderBottomColor: isDark ? colors.neutral800 : colors.neutral200,
      }}
    >
      <Text
        className="text-xl font-bold"
        style={{ color: colors.text, letterSpacing: -0.3 }}
      >
        My Job Postings
      </Text>
      <Pressable
        onPress={onPostJob}
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: colors.brandSecondary }}
      >
        <Ionicons name="add" size={22} color="#fff" />
      </Pressable>
    </View>
  );
}
