import { Text } from "react-native";
import { useAppTheme } from "../../utils/theme";

export default function TermsContent({ children }) {
  const { colors } = useAppTheme();

  return (
    <Text
      className="text-lg mb-6 leading-relaxed"
      style={{ color: colors.textSecondary }}
    >
      {children}
    </Text>
  );
}
