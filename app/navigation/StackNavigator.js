import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import CandidateApp from "../navigation/Candidate/CandidateApp";
import RecruiterApp from "../navigation/Recruiter/RecruiterApp";
import LoginScreen from "../screens/auth/candidate/LoginScreen";
import SignUpScreen from "../screens/auth/candidate/SignUpScreen";
import RecruiterLoginScreen from "../screens/auth/recruiter/RecruiterLoginScreen";
import RecruiterSignUpScreen from "../screens/auth/recruiter/RecruiterSignUpScreen";
import { useAppTheme } from "../utils/theme";
import OnboardingStack from "./OnboardingStack";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { isAuthenticated, isNewUser, userRole, loading } = useAuth();
  const { colors } = useAppTheme();

  if (loading) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
        transitionSpec: {
          open: { animation: "timing", config: { duration: 300 } },
          close: { animation: "timing", config: { duration: 300 } },
        },
      }}
    >
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
            name="RecruiterLogin"
            component={RecruiterLoginScreen}
          />
          <Stack.Screen
            name="RecruiterSignUp"
            component={RecruiterSignUpScreen}
          />
        </>
      ) : isNewUser ? (
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      ) : userRole === "candidate" ? (
        <Stack.Screen
          name="CandidateApp"
          component={CandidateApp}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="RecruiterApp"
          component={RecruiterApp}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
