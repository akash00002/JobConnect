import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/candidate/LoginScreen";
import SignUpScreen from "../screens/auth/candidate/SignUpScreen";
import RecruiterLoginScreen from "../screens/auth/recruiter/RecruiterLoginScreen";
import RecruiterSignUpScreen from "../screens/auth/recruiter/RecruiterSignUpScreen";
import HomeScreen from "../screens/main/candidate/HomeScreen";
import { useAppTheme } from "../utils/theme";
import OnboardingStack from "./OnboardingStack";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const colors = useAppTheme();
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
            config: {
              duration: 300,
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 300,
            },
          },
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="RecruiterLogin" component={RecruiterLoginScreen} />
      <Stack.Screen name="RecruiterSignUp" component={RecruiterSignUpScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingStack} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
