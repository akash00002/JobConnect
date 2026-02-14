import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import Step1Screen from "../screens/onboarding/candidate/Step1Screen";
import { useAppTheme } from "../utils/theme";

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.background, // Match background
        },
        headerTintColor: colors.brandPrimary,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
          color: colors.text,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
        cardStyle: {
          backgroundColor: colors.background,
        },
        presentation: "card",
        headerShadowVisible: false, // ✅ Remove shadow/border

        // ✅ Custom back button
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="ml-2"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={colors.brandPrimary} />
          </TouchableOpacity>
        ),
      })}
    >
      <Stack.Screen
        name="Step1"
        component={Step1Screen}
        options={{
          title: "Complete Your Profile",
          headerLeft: null, // ✅ Hide back button on first screen
        }}
      />
    </Stack.Navigator>
  );
}
