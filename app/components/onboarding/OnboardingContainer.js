import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../utils/theme";

export default function AuthFormContainer({ title, subtitle, children }) {
  const { colors } = useAppTheme();
  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          maxWidth: 448,
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView className="flex-1">
          {/* Header Section */}

          {/* Form Content */}
          {children}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
