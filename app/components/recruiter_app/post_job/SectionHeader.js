import { Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";

export default function SectionHeader({ title, first }) {
  const { colors } = useAppTheme();

  return (
    <>
      {!first && (
        <View
          style={{
            height: 1,
            backgroundColor: colors.neutral200,
            marginHorizontal: 0,
            marginBottom: 20,
          }}
        />
      )}
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          letterSpacing: 1.2,
          textTransform: "uppercase",
          color: colors.brandPrimary,
          marginBottom: 16,
        }}
      >
        {title}
      </Text>
    </>
  );
}
