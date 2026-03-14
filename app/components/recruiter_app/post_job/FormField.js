import { Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function FormField({ label, children }) {
  const { colors } = useAppTheme();

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          marginBottom: 8,
          color: colors.text,
        }}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}
