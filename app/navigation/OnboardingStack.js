import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1Screen from "../screens/onboarding/candidate/Step1Screen";
import Step2Screen from "../screens/onboarding/candidate/Step2Screen";
import { useAppTheme } from "../utils/theme";

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackTitleVisible: false,

        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.brandPrimary,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
          color: colors.text,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
        // ✅ Add these to fix the glitch
        cardStyle: {
          backgroundColor: colors.background,
        },
        presentation: "card",

        headerShadowVisible: true,
      }}
    >
      <Stack.Screen
        name="Step1"
        component={Step1Screen}
        options={{ title: "Complete Your Profile", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="Step2"
        component={Step2Screen}
        options={{ title: "Profile Setup", headerBackTitle: "Back" }}
      />
    </Stack.Navigator>
  );
}
