import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileProvider } from "../../context/ProfileContext";
import CandidateSettingsScreen from "../../screens/main/SettingsScreen";
import CandidateTabNavigator from "./CandidateTabNavigator";

const Stack = createNativeStackNavigator();

export default function CandidateNavigator() {
  return (
    <ProfileProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CandidateTabs" component={CandidateTabNavigator} />
        <Stack.Screen name="Settings" component={CandidateSettingsScreen} />
      </Stack.Navigator>
    </ProfileProvider>
  );
}
