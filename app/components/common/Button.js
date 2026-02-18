import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "../../utils/theme"; // ✅ Adjust path as needed

export default function AuthButton({
  onPress,
  title,
  iconName,
  disabled = false,
  loading = false,
  variant = "primary",
}) {
  const { colors, isDark } = useAppTheme(); // ✅ Add this

  const variants = {
    primary: {
      bgColor: colors.brandPrimary,
      bgDisabled: isDark ? colors.neutral700 : colors.neutral200,
      textColor: "#ffffff",
      textDisabled: colors.neutral500,
      iconColor: "#ffffff",
      loaderColor: "#ffffff",
    },
    secondary: {
      bgColor: isDark ? colors.neutral800 : colors.neutral200,
      bgDisabled: isDark ? colors.neutral700 : colors.neutral200,
      textColor: isDark ? colors.neutral300 : colors.neutral700, // neutral-300 / neutral-700
      textDisabled: colors.neutral500,
      iconColor: isDark ? colors.neutral300 : colors.neutral700,
      loaderColor: colors.neutral500,
    },
    recruiter: {
      bgColor: colors.brandSecondary,
      bgDisabled: isDark ? colors.neutral700 : colors.neutral200,
      textColor: "#ffffff",
      textDisabled: colors.neutral500,
      iconColor: "#ffffff",
      loaderColor: "#ffffff",
    },
    ghost: {
      bgColor: "transparent",
      bgDisabled: "transparent",
      textColor: colors.neutral500,
      textDisabled: colors.neutral500,
      iconColor: colors.brandPrimary,
      loaderColor: colors.brandPrimary,
    },
  };

  const current = variants[variant];
  const isDisabledOrLoading = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabledOrLoading}
      className="h-16 rounded-2xl w-full flex-row items-center justify-center mt-2 active:scale-[0.98]"
      style={{
        backgroundColor: isDisabledOrLoading
          ? current.bgDisabled
          : current.bgColor,
      }}
      activeOpacity={0.8}
    >
      <Text
        className="text-xl font-semibold mr-2"
        style={{
          color: isDisabledOrLoading ? current.textDisabled : current.textColor,
        }}
      >
        {title}
      </Text>

      {/* Show icon only when not disabled and not loading */}
      {iconName && !disabled && !loading && (
        <Ionicons name={iconName} size={20} color={current.iconColor} />
      )}

      {/* Show loader ONLY when loading */}
      {loading && (
        <ActivityIndicator color={current.loaderColor} size="small" />
      )}
    </TouchableOpacity>
  );
}
