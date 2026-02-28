import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import CandidateOnboardingStep1Screen from "../screens/onboarding/candidate/CandidateOnboardingStep1Screen";
import CandidateOnboardingStep2Screen from "../screens/onboarding/candidate/CandidateOnboardingStep2Screen";
import CandidateOnboardingStep3Screen from "../screens/onboarding/candidate/CandidateOnboardingStep3Screen";
import CandidateOnboardingStep4Screen from "../screens/onboarding/candidate/CandidateOnboardingStep4Screen";
import RecruiterOnboardingStep1Screen from "../screens/onboarding/recruiter/RecruiterOnboardingStep1Screen";
import RecruiterOnboardingStep2Screen from "../screens/onboarding/recruiter/RecruiterOnboardingStep2Screen";
import RecruiterOnboardingStep3Screen from "../screens/onboarding/recruiter/RecruiterOnboardingStep3Screen";
import { useAppTheme } from "../utils/theme";

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  const { colors } = useAppTheme();
  const { userRole } = useAuth();

  const isCandidate = userRole === "candidate";

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
            <Ionicons
              name="arrow-back"
              size={24}
              color={isCandidate ? colors.brandPrimary : colors.brandSecondary}
            />
          </TouchableOpacity>
        ),
      })}
    >
      {isCandidate ? (
        <>
          <Stack.Screen
            name="CandidateOnboardingStep1"
            component={CandidateOnboardingStep1Screen}
            options={{
              title: "Complete Your Profile",
              headerLeft: null,
            }}
          />
          <Stack.Screen
            name="CandidateOnboardingStep2"
            component={CandidateOnboardingStep2Screen}
            options={{
              title: "Work & Education",
            }}
          />
          <Stack.Screen
            name="CandidateOnboardingStep3"
            component={CandidateOnboardingStep3Screen}
            options={{
              title: "Skills & Portfolio",
            }}
          />
          <Stack.Screen
            name="CandidateOnboardingStep4"
            component={CandidateOnboardingStep4Screen}
            options={{
              title: "Profile Setup",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="RecruiterOnboardingStep1"
            component={RecruiterOnboardingStep1Screen}
            options={{ title: "Company Profile", headerLeft: null }}
          />
          <Stack.Screen
            name="RecruiterOnboardingStep2"
            component={RecruiterOnboardingStep2Screen}
            options={{ title: "Company Branding" }}
          />
          <Stack.Screen
            name="RecruiterOnboardingStep3"
            component={RecruiterOnboardingStep3Screen}
            options={{ title: "Finalize your profile" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
