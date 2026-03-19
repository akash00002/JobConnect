import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function BulletPointInput({ points, onChange, placeholder }) {
  const { colors, isDark } = useAppTheme();
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const addPoint = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onChange([...points, trimmed]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const removePoint = (index) => {
    onChange(points.filter((_, i) => i !== index));
  };

  return (
    <View>
      {/* Existing points */}
      {points.map((point, index) => (
        <View
          key={index}
          className="flex-row items-start mb-2"
          style={{ gap: 10 }}
        >
          <View
            className="w-1.5 h-1.5 rounded-full mt-1.5"
            style={{ backgroundColor: colors.brandSecondary, flexShrink: 0 }}
          />
          <Text
            className="flex-1 text-sm leading-5"
            style={{ color: colors.text }}
          >
            {point}
          </Text>
          <Pressable
            onPress={() => removePoint(index)}
            hitSlop={8}
            className="p-0.5"
          >
            <Ionicons name="close-circle" size={18} color={colors.neutral400} />
          </Pressable>
        </View>
      ))}

      {/* Input row */}
      <View
        className="flex-row items-center h-14 rounded-xl px-3"
        style={{
          borderWidth: 1.5,
          borderColor: focused
            ? colors.brandSecondary
            : isDark
              ? colors.neutral700
              : colors.neutral200,
          backgroundColor: colors.surface,
          gap: 8,
        }}
      >
        {/* Bullet indicator */}
        <View
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: isDark ? colors.neutral700 : colors.neutral300,
            flexShrink: 0,
          }}
        />

        <TextInput
          ref={inputRef}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={placeholder || "Type and press add..."}
          placeholderTextColor={colors.neutral400}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={addPoint}
          returnKeyType="done"
          blurOnSubmit={false}
          style={{
            color: colors.text,
            paddingVertical: 0, // removes iOS default padding that causes misalignment
          }}
          className="flex-1 font-md h-14"
        />

        {/* Add button */}
        <Pressable
          onPress={addPoint}
          className="w-8 h-8 rounded-xl items-center justify-center"
          style={{
            backgroundColor: inputValue.trim()
              ? colors.brandSecondary
              : isDark
                ? colors.neutral700
                : colors.neutral100,
          }}
        >
          <Ionicons
            name="add"
            size={20}
            color={inputValue.trim() ? "#fff" : colors.neutral400}
          />
        </Pressable>
      </View>

      {/* Count */}
      {points.length > 0 && (
        <Text
          className="text-xs text-right mt-1.5"
          style={{ color: colors.neutral400 }}
        >
          {points.length} {points.length === 1 ? "point" : "points"} added
        </Text>
      )}
    </View>
  );
}
