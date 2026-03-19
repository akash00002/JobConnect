import { useState } from "react";
import { TextInput, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function AppInput({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  multiline,
  numberOfLines,
  leftIcon,
  prefix,
  maxLength,
  style,
}) {
  const { colors, isDark } = useAppTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View
      className={`flex-row rounded-xl px-3.5 ${
        multiline ? "items-start py-3.5" : "items-center h-14"
      }`}
      style={{
        borderWidth: 1.5,
        borderColor: focused
          ? colors.brandSecondary
          : isDark
            ? colors.neutral700
            : colors.neutral200,
        backgroundColor: colors.surface,
      }}
    >
      {leftIcon && <View className="mr-2">{leftIcon}</View>}
      {prefix && <View className="mr-1">{prefix}</View>}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral400}
        keyboardType={keyboardType || "default"}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          {
            flex: 1,
            fontSize: 15,
            color: colors.text,
            textAlignVertical: multiline ? "top" : "center",
            paddingVertical: 0,
            minHeight: multiline ? 120 : undefined,
          },
          style,
        ]}
      />
    </View>
  );
}
