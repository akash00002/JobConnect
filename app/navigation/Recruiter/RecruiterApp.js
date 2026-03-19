import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobDetailScreen from "../../screens/main/recruiter/JobDetailScreen";
import PostJobScreen from "../../components/recruiter_app/post_job/PostJobScreen";
import { ProfileProvider } from "../../context/ProfileContext";
import CandidateSettingsScreen from "../../screens/main/SettingsScreen";
import RecruiterTabNavigator from "./RecruiterTabNavigator";

const Stack = createNativeStackNavigator();

export default function CandidateNavigator() {
  return (
    <ProfileProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecruiterTabs" component={RecruiterTabNavigator} />
        <Stack.Screen name="Settings" component={CandidateSettingsScreen} />
        <Stack.Screen name="PostJob" component={PostJobScreen} />
        <Stack.Screen name="JobDetailScreen" component={JobDetailScreen} />
      </Stack.Navigator>
    </ProfileProvider>
  );
}
