import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function PostJobHeader({ title, onBack }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="flex-row items-center justify-between px-4 py-2.5"
      style={{
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? colors.neutral800 : colors.neutral200,
      }}
    >
      <Pressable
        onPress={onBack}
        className="w-10 h-10 rounded-full items-center justify-center"
        style={({ pressed }) => ({
          backgroundColor: pressed ? colors.neutral100 : "transparent",
        })}
      >
        <Ionicons name="arrow-back" size={22} color={colors.text} />
      </Pressable>

      <Text className="text-lg font-bold" style={{ color: colors.text }}>
        {title}
      </Text>

      <View className="w-10" />
    </View>
  );
}
