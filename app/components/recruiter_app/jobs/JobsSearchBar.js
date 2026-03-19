import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function JobsSearchBar({ value, onChangeText }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View className="px-4 py-3" style={{ backgroundColor: colors.surface }}>
      <View
        className="flex-row items-center rounded-xl px-3 h-14"
        style={{
          backgroundColor: isDark ? colors.neutral800 : colors.neutral100,
          gap: 8,
        }}
      >
        <Ionicons name="search-outline" size={20} color={colors.neutral400} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Search jobs, location, category..."
          placeholderTextColor={colors.neutral400}
          style={{
            flex: 1,
            fontSize: 15,
            color: colors.text,
            height: 56,
            paddingVertical: 0,
          }}
        />
        {value.length > 0 && (
          <Pressable onPress={() => onChangeText("")}>
            <Ionicons name="close-circle" size={18} color={colors.neutral400} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
