import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobsErrorState({ error, onRetry }) {
  const { colors } = useAppTheme();

  return (
    <View className="flex-1 items-center justify-center px-8">
      <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
      <Text
        className="text-base font-semibold mt-4 text-center"
        style={{ color: colors.error }}
      >
        {error}
      </Text>
      <Pressable
        onPress={onRetry}
        className="mt-4 px-6 py-3 rounded-xl"
        style={{ backgroundColor: colors.brandSecondary }}
      >
        <Text className="text-sm font-bold text-white">Try Again</Text>
      </Pressable>
    </View>
  );
}
