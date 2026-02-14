// components/auth/AuthFormContainer.js
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppTheme } from "../../utils/theme";
import Logo from "../common/Logo";

const decorativeBlurVariants = {
  variant1: (
    <>
      <View className="absolute top-1/2 -translate-y-1/2 right-0 w-44 h-44 rounded-full opacity-30 bg-brand-primary/20" />
      <View className="absolute bottom-40 left-8 w-32 h-32 rounded-full opacity-30 bg-purple-500/20" />
    </>
  ),
  variant2: (
    <>
      <View className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-50 bg-brand-primary/10" />
      <View className="absolute top-40 -left-20 w-40 h-40 rounded-full opacity-50 bg-purple-500/10" />
    </>
  ),
  variant3: (
    <>
      <View className="absolute top-20 right-0 w-56 h-56 rounded-full opacity-40 bg-blue-500/15" />
      <View className="absolute bottom-32 -left-10 w-48 h-48 rounded-full opacity-40 bg-pink-500/15" />
      <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full opacity-20 bg-green-500/10" />
    </>
  ),
  variant4: (
    <>
      <View className="absolute top-10 -left-16 w-52 h-52 rounded-full opacity-35 bg-purple-600/20" />
      <View className="absolute bottom-20 -right-16 w-44 h-44 rounded-full opacity-35 bg-indigo-500/20" />
      <View className="absolute top-2/3 left-8 w-28 h-28 rounded-full opacity-25 bg-cyan-500/15" />
    </>
  ),
};

export default function AuthFormContainer({
  title,
  subtitle,
  children,
  decorativeBlurs = "variant1", // default to variant1, can be false to disable
}) {
  const { colors } = useAppTheme();
  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Decorative Background Blurs */}
      {decorativeBlurs && decorativeBlurVariants[decorativeBlurs]}

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingVertical: 32,
          maxWidth: 448,
          alignSelf: "center",
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView className="flex-1">
          {/* Header Section */}
          <View className="items-center mt-8 mb-10">
            <Logo />
            <Text
              className="text-3xl font-bold mb-2 text-center"
              style={{ color: colors.text }}
            >
              {title}
            </Text>
            <Text
              className="text-base text-center max-w-[280px] leading-5"
              style={{ color: colors.textSecondary }}
            >
              {subtitle}
            </Text>
          </View>

          {/* Form Content */}
          {children}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
