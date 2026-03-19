import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function DashboardHeader({
  name,
  avatarUrl,
  onNotificationPress,
  navigation,
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="flex-row items-center justify-between px-4 pb-3 border-b"
      style={{
        backgroundColor: colors.surface,
        borderBottomColor: isDark ? colors.neutral800 : colors.neutral100,
      }}
    >
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={() => navigation.navigate("RecruiterProfileScreen")}
        >
          <Image
            source={{ uri: avatarUrl }}
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              borderWidth: 2,
              borderColor: isDark ? colors.neutral700 : colors.neutral100,
            }}
          />
          <View
            className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500"
            style={{
              borderWidth: 2,
              borderColor: isDark ? colors.neutral800 : colors.neutral100,
            }}
          />
        </Pressable>

        <View>
          <Text
            className="text-xs font-normal"
            style={{ color: colors.textSecondary }}
          >
            Welcome,
          </Text>
          <Text
            className="text-base font-bold"
            style={{ color: colors.text, letterSpacing: -0.3 }}
          >
            {name}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onNotificationPress}
        className="w-10 h-10 rounded-full items-center justify-center "
        style={({ pressed }) => ({
          backgroundColor: pressed ? colors.neutral100 : colors.surface,
          borderColor: isDark ? colors.neutral700 : colors.neutral100,
        })}
      >
        <Ionicons name="notifications" size={22} color={colors.text} />
        <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
      </Pressable>
    </View>
  );
}
