import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../utils/theme"; // ✅ Adjust path as needed

const RecruiterLink = ({ onPress }) => {
  const { colors, isDark } = useAppTheme(); // ✅ Add this

  return (
    <View
      className="mt-auto pt-4 w-full items-center"
      style={{
        borderTopWidth: 1,
        borderTopColor: isDark ? colors.neutral800 : colors.neutral200,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center gap-2 py-2 px-4 rounded-lg active:opacity-70"
      >
        <Ionicons name="briefcase" size={18} color={colors.textSecondary} />
        <Text
          className="text-base font-medium"
          style={{ color: colors.textSecondary }}
        >
          Login as Recruiter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecruiterLink;
