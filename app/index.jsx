import AuthProvider from "./context/AuthContext";
import { OnboardingProvider } from "./context/OnboardingContext";
import { ToastProvider } from "./features/toast/ToastContext";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <ToastProvider>
          <StackNavigator />
        </ToastProvider>
      </OnboardingProvider>
    </AuthProvider>
  );
}
