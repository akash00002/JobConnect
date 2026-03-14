import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function PostJobHeader({ onBack }) {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 10,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral200,
      }}
    >
      <Pressable
        onPress={onBack}
        style={({ pressed }) => ({
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: pressed ? colors.neutral100 : "transparent",
        })}
      >
        <Ionicons name="arrow-back" size={22} color={colors.text} />
      </Pressable>

      <Text style={{ fontSize: 17, fontWeight: "700", color: colors.text }}>
        Post a Job
      </Text>

      {/* Spacer to center title */}
      <View style={{ width: 40 }} />
    </View>
  );
}
