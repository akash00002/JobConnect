import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
  subTitle,
  placeholder,
  iconName,
  materialIcon,
  value,
  onChangeText,
  isPassword = false,
  error = "",
  onBlur,
  variant = "primary",
  children,
  height,
  ...textInputProps
}) => {
  const { colors, isDark } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = error && !isFocused;
  const isUpload = variant === "upload";

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
    upload: {
      borderColor: colors.brandPrimary,
      textColor: colors.brandPrimary,
      iconColor: colors.brandPrimary,
    },
  };

  const current = variants[variant];

  const getBorderColor = () => {
    if (hasError) return colors.error;
    if (isFocused) return current.borderColor;
    return isDark ? colors.neutral700 : colors.neutral300;
  };

  const getIconColor = () => {
    if (hasError) return colors.error;
    if (isFocused) return current.iconColor;
    return colors.neutral400;
  };

  return (
    <View className="mb-5">
      {title && (
        <Text
          className="text-lg font-medium ml-1 mb-2"
          style={{ color: colors.text }}
        >
          {title}
        </Text>
      )}

      {subTitle && (
        <Text
          className="text-sm ml-1 mb-2"
          style={{ color: colors.textSecondary }}
        >
          {subTitle}
        </Text>
      )}

      <View
        className={`flex-row rounded-2xl border px-4 ${height ? "items-start " : "items-center h-16"}`}
        style={{
          backgroundColor: colors.surface,
          borderColor: getBorderColor(),
          ...(isUpload && {
            borderWidth: 2,
            borderStyle: "dashed",
            height: 200,
            backgroundColor: isDark ? colors.neutral800 : colors.neutral100,
          }),
          ...(height && {
            height,
          }),
        }}
      >
        {!isUpload && iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={getIconColor()}
            style={{ marginRight: 12 }}
          />
        )}

        {!isUpload && materialIcon && (
          <MaterialIcons
            name={materialIcon}
            size={20}
            color={getIconColor()}
            style={{ marginRight: 12 }}
          />
        )}

        {!isUpload && (
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
              placeholderTextColor={colors.neutral400}
              multiline={!!height}
              textAlignVertical={height ? "top" : "auto"}
              secureTextEntry={isPassword && !showPassword}
              {...textInputProps}
            />
          </View>
        )}

        {isPassword ? (
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
        ) : isUpload ? (
          children && (
            <View className="absolute inset-0 items-center justify-center gap-2">
              {children}
            </View>
          )
        ) : (
          children && <View className="ml-2">{children}</View>
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

export default TitleInput;
