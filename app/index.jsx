import AuthProvider from "./context/AuthContext";
import { ToastProvider } from "./features/toast/ToastContext";
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <StackNavigator />
      </ToastProvider>
    </AuthProvider>
  );
}
