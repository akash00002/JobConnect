import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "../../utils/theme";

export default function AddNewButton({
  onPress,
  title = "Add New Experience",
}) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-center gap-2 rounded-2xl h-16 mt-2"
      style={{
        borderWidth: 2,
        borderColor: colors.neutral300,
        borderStyle: "dashed",
      }}
    >
      <Ionicons name="add-circle-sharp" size={20} color={colors.brandPrimary} />
      <Text
        style={{ color: colors.brandPrimary, fontSize: 16, fontWeight: "600" }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
