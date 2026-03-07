import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppTheme } from "../../utils/theme";

export default function AboutMe({ aboutMe, onSave }) {
  const { colors, isDark } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (aboutMe) setText(aboutMe);
  }, [aboutMe]);

  async function handleSave() {
    setIsEditing(false);
    try {
      await onSave?.(text);
    } catch {}
  }

  return (
    <View className="mt-6">
      <View className="flex-col gap-2">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold" style={{ color: colors.text }}>
            About Me
          </Text>
          {isEditing ? (
            <TouchableOpacity onPress={handleSave}>
              <Text
                className="text-base font-semibold"
                style={{ color: colors.brandPrimary }}
              >
                Save
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <View
          className="flex p-4 rounded-xl"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            minWidth: "100%",
            borderColor: isEditing
              ? colors.brandPrimary // highlight border when editing
              : isDark
                ? colors.neutral700
                : colors.neutral100,
          }}
        >
          {isEditing ? (
            <View style={{ height: 100, overflow: "hidden" }}>
              <TextInput
                value={text}
                onChangeText={setText}
                multiline
                autoFocus
                numberOfLines={4}
                scrollEnabled={false}
                style={{
                  color: colors.text,
                  fontSize: 14,
                  textAlignVertical: "top",
                }}
                placeholder="Add a short bio about yourself..."
                placeholderTextColor={colors.neutral400}
              />
            </View>
          ) : (
            <Pressable onPress={() => setIsEditing(true)}>
              <Text
                className="text-base font-normal"
                style={{ color: colors.textSecondary }}
              >
                {text || "Add a short bio about yourself"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
