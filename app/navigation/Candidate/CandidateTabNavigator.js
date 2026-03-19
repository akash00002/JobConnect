import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CandidateHomeScreen from "../../screens/main/candidate/CandidateHomeScreen";
import CandidateProfileScreen from "../../screens/main/candidate/CandidateProfileScreen";
import { useAppTheme } from "../../utils/theme";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brandPrimary,
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
        name="Home"
        component={CandidateHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={CandidateHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={CandidateHomeScreen}
        options={{
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
        name="Profile"
        component={CandidateProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
