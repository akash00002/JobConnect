import { Text, View } from "react-native";
import { useAppTheme } from "../../utils/theme"; // ✅ Adjust path as needed

export default function BulletList({ items, className = "" }) {
  const { colors } = useAppTheme(); // ✅ Add this

  return (
    <View className={`mb-6 ml-1 ${className}`}>
      {items.map((item, index) => (
        <Text
          key={index}
          className={`text-lg ${index < items.length - 1 ? "mb-2" : ""}`}
          style={{ color: colors.textSecondary }}
        >
          • {item}
        </Text>
      ))}
    </View>
  );
}
