import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./app/context/AuthContext";
import { OnboardingProvider } from "./app/context/OnboardingContext";
import { ToastProvider } from "./app/features/toast/ToastContext";
import StackNavigator from "./app/navigation/StackNavigator";
import SplashScreen from "./app/screens/SplashScreen";
import "./global.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <OnboardingProvider>
            <ToastProvider>
              <StatusBar style="auto" />
              <StackNavigator />
            </ToastProvider>
          </OnboardingProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);

// import { Text, View } from "react-native";

// export default function App() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Hello</Text>
//     </View>
//   );
// }
