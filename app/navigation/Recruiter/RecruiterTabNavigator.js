import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecruiterDashboardScreen from "../../screens/main/recruiter/RecruiterDashboardScreen";
import RecruiterJobScreen from "../../screens/main/recruiter/RecruiterJobScreen";
import RecruiterMessagesScreen from "../../screens/main/recruiter/RecruiterMessagesScreen";
import RecruiterProfileScreen from "../../screens/main/recruiter/RecruiterProfileScreen";
import { useAppTheme } from "../../utils/theme";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brandSecondary,
        tabBarInactiveTintColor: colors.neutral400,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: isDark ? colors.neutral800 : colors.neutral200,
          borderTopWidth: 1,
          height: 50 + insets.bottom, // ← accounts for safe area
          paddingTop: 8,
          paddingBottom: insets.bottom || 8, // ← uses safe area or fallback
          paddingLeft: 8,
          paddingRight: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="RecruiterDashboardScreen"
        component={RecruiterDashboardScreen}
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecruiterJobScreen"
        component={RecruiterJobScreen}
        options={{
          title: "Jobs",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="work" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecruiterMessagesScreen"
        component={RecruiterMessagesScreen}
        options={{
          title: "Messages",
          headerShown: false,
          tabBarBadge: "", // red dot like in your HTML
          tabBarBadgeStyle: {
            minWidth: 8,
            height: 8,
            borderRadius: 4,
            fontSize: 0, // hides number, shows dot only
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat-bubble" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="RecruiterProfileScreen"
        component={RecruiterProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
