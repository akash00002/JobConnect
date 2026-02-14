import { Text } from "react-native";
import { useAppTheme } from "../../utils/theme";

export default function TermsHeader({ children }) {
  const { colors } = useAppTheme();

  return (
    <Text className="text-xl font-bold mb-3" style={{ color: colors.text }}>
      {children}
    </Text>
  );
}
