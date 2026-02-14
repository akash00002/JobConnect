import { Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../utils/theme";

const AuthFooter = ({ question, actionText, onPress, isRecruiter = false }) => {
  const { colors } = useAppTheme();

  return (
    <View className="mt-8 items-center">
      <View className="flex-row items-center">
        <Text className="text-sm" style={{ color: colors.textSecondary }}>
          {question}{" "}
        </Text>
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <Text
            className="text-sm font-semibold"
            style={{
              color: isRecruiter ? colors.brandSecondary : colors.brandPrimary,
            }}
          >
            {actionText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthFooter;
