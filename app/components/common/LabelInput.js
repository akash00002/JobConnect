import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppTheme } from "../../utils/theme"; // ✅ Import your theme hook

const LabelInput = ({
  label,
  iconName,
  value,
  onChangeText,
  isPassword = false,
  error = "",
  onBlur,
  variant = "primary",
  ...textInputProps
}) => {
  const { colors, isDark } = useAppTheme(); // ✅ Use your theme
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = isFocused || value;
  const hasError = error && !isFocused;

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const variants = {
    primary: {
      borderColor: colors.brandPrimary,
      textColor: colors.brandPrimary,
      iconColor: colors.brandPrimary,
    },
    recruiter: {
      borderColor: colors.brandSecondary,
      textColor: colors.brandSecondary,
      iconColor: colors.brandSecondary,
    },
  };

  const current = variants[variant];

  // Determine border color
  const getBorderColor = () => {
    if (hasError) return colors.error;
    if (isFocused) return current.borderColor;
    return isDark ? colors.neutral700 : colors.neutral200;
  };

  // Determine icon color
  const getIconColor = () => {
    if (hasError) return colors.error;
    if (isFocused) return current.iconColor;
    return colors.neutral500;
  };

  return (
    <View className="mb-5">
      <View
        className="flex-row items-center h-16 rounded-2xl border px-4 shadow-soft"
        style={{
          backgroundColor: colors.surface,
          borderColor: getBorderColor(),
        }}
      >
        <Ionicons
          name={iconName}
          size={20}
          color={getIconColor()}
          style={{ marginRight: 12 }}
        />

        <View className="flex-1 h-full justify-center">
          <View className="relative h-full justify-center">
            <Text
              className="absolute left-0 font-medium"
              style={{
                top: isActive ? 8 : undefined,
                fontSize: isActive ? 12 : 16,
                color: hasError
                  ? colors.error
                  : isActive
                    ? current.textColor
                    : colors.textSecondary,
              }}
              pointerEvents="none"
            >
              {label}
            </Text>

            <TextInput
              style={{
                fontSize: 17,
                height: "100%",
                paddingTop: Platform.OS === "android" ? 20 : 15,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                textAlignVertical: "center",
                color: colors.text, // ✅ Text color
              }}
              value={value}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={handleBlur}
              secureTextEntry={isPassword && !showPassword}
              placeholderTextColor={colors.textSecondary}
              {...textInputProps}
            />
          </View>
        </View>

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="p-1"
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </View>

      {hasError && (
        <View className="flex-row items-center mt-1 px-1">
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text className="text-xs ml-1" style={{ color: colors.error }}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

export default LabelInput;
