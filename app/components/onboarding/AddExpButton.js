import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useAppTheme } from "../../utils/theme";

import TouchableScale from "../common/TouchableScale";

export default function AddExpButton({ onPress, buttonTitle }) {
  const { colors } = useAppTheme();

  return (
    <TouchableScale
      onPress={onPress}
      activeOpacity={0.7}
      scale={0.98}
      className="flex-1 flex-row items-center justify-center gap-2 border-2 rounded-2xl h-14 mt-5"
      style={{
        borderColor: colors.brandPrimary,
      }}
    >
      <Ionicons name="add" size={20} color={colors.brandPrimary} />
      <Text
        style={{ color: colors.brandPrimary, fontSize: 16, fontWeight: 600 }}
      >
        {buttonTitle}
      </Text>
    </TouchableScale>
  );
}
