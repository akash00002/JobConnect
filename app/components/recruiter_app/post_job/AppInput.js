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
  const { colors } = useAppTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: multiline ? "flex-start" : "center",
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: focused ? colors.brandPrimary : colors.neutral200,
        backgroundColor: colors.surface,
        paddingHorizontal: 14,
        paddingVertical: multiline ? 14 : 0,
        height: multiline ? undefined : 52,
      }}
    >
      {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
      {prefix && <View style={{ marginRight: 4 }}>{prefix}</View>}
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
            paddingVertical: multiline ? 0 : 0,
            minHeight: multiline ? 120 : undefined,
          },
          style,
        ]}
      />
    </View>
  );
}
