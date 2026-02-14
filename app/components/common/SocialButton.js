import { Image, Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "../../utils/theme"; // ✅ Adjust path as needed

export default function SocialButton({
  title,
  icon,
  onPress,
  disabled = false,
}) {
  const { colors, isDark } = useAppTheme(); // ✅ Add this

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-1 h-12 px-4 rounded-xl flex-row items-center justify-center"
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: isDark ? colors.neutral700 : colors.neutral200,
        opacity: disabled ? 0.5 : 1,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Image
        source={icon}
        style={{ width: 20, height: 20, marginRight: 8 }}
        resizeMode="contain"
      />
      <Text
        className="text-sm font-medium"
        style={{
          color: isDark ? colors.neutral300 : colors.neutral700,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
