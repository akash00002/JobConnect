import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { useAppTheme } from "../utils/theme";
import OnboardingStack from "./OnboardingStack";

// Auth Screens
import LoginScreen from "../screens/auth/candidate/LoginScreen";
import SignUpScreen from "../screens/auth/candidate/SignUpScreen";

import RecruiterLoginScreen from "../screens/auth/recruiter/RecruiterLoginScreen";
import RecruiterSignUpScreen from "../screens/auth/recruiter/RecruiterSignUpScreen";

// App Screens
import Settings from "../screens/main/SettingsScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { isAuthenticated, isNewUser, loading } = useAuth();
  const { colors } = useAppTheme();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
        animation: "slide_from_right",
        transitionSpec: {
          open: {
            animation: "timing",
            config: { duration: 300 },
          },
          close: {
            animation: "timing",
            config: { duration: 300 },
          },
        },
      }}
    >
      {!isAuthenticated ? (
        // 🔐 AUTH STACK
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
        // 🚀 ONBOARDING STACK - new users from signup
        <Stack.Screen name="Onboarding" component={OnboardingStack} />
      ) : (
        // 🏠 HOME STACK - existing users from login
        <>
          <Stack.Screen
            name="CandidateMainApp"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </>
      )}
    </Stack.Navigator>
  );
}
