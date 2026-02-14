// components/common/TitleInput.js
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppTheme } from "../../utils/theme";

const TitleInput = ({
  title,
  placeholder,
  iconName,
  value,
  onChangeText,
  isPassword = false,
  error = "",
  onBlur,
  variant = "primary",
  ...textInputProps
}) => {
  const { colors, isDark } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      {/* Title - Always visible above input */}
      {title && (
        <Text
          className="text-lg font-medium mb-2 ml-1"
          style={{
            color: hasError
              ? colors.error
              : isFocused
                ? current.textColor
                : colors.text,
          }}
        >
          {title}
        </Text>
      )}

      {/* Input Field */}
      <View
        className="flex-row items-center h-14 rounded-2xl border px-4"
        style={{
          backgroundColor: colors.surface,
          borderColor: getBorderColor(),
        }}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={getIconColor()}
            style={{ marginRight: 12 }}
          />
        )}

        <View className="flex-1">
          <TextInput
            style={{
              fontSize: 16,
              color: colors.text,
              paddingVertical: Platform.OS === "ios" ? 12 : 8,
            }}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            secureTextEntry={isPassword && !showPassword}
            {...textInputProps}
          />
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

      {/* Error Message */}
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

export default TitleInput;
