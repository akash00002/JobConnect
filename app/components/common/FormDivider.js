import { Text, View } from "react-native";
import { useAppTheme } from "../../utils/theme";

const FormDivider = ({ text = "OR CONTINUE WITH" }) => {
  const { colors, isDark } = useAppTheme();

  return (
    <View className="flex-row items-center my-6">
      <View
        className="flex-1 h-[1px]"
        style={{
          backgroundColor: isDark ? colors.neutral700 : colors.neutral200,
        }}
      />
      <Text
        className="text-sm font-medium mx-4"
        style={{ color: colors.neutral400 }}
      >
        {text}
      </Text>
      <View
        className="flex-1 h-[1px]"
        style={{
          backgroundColor: isDark ? colors.neutral700 : colors.neutral200,
        }}
      />
    </View>
  );
};

export default FormDivider;
