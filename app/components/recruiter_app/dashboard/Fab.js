import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../../../utils/theme";

export default function FAB({ onPress }) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-20 right-4 z-40 w-14 h-14 rounded-full items-center justify-center"
      style={({ pressed }) => ({
        backgroundColor: colors.brandPrimary,
        transform: [{ scale: pressed ? 0.9 : 1 }],
        shadowColor: colors.brandPrimary,
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
      })}
    >
      <Ionicons name="add" size={28} color="#fff" />
    </Pressable>
  );
}
