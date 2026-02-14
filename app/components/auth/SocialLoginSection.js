// components/auth/SocialLoginSection.js
import { View } from "react-native";
import appleIcon from "../../../assets/images/apple.png";
import googleIcon from "../../../assets/images/google.png";
import { useToast } from "../../features/toast/ToastContext";
import { useHaptics } from "../../hooks/useHaptic";
import SocialButton from "../common/SocialButton";

export default function SocialLoginSection({ disabled = false }) {
  const { showToast } = useToast();
  const { impact } = useHaptics();

  const handleGoogleLogin = () => {
    showToast("Coming Soon! Google login will be available soon");
    impact();
  };

  const handleAppleLogin = () => {
    showToast("Coming Soon! Apple login will be available soon");
    impact();
  };

  return (
    <>
      <View className="flex-row gap-4">
        <SocialButton
          onPress={handleGoogleLogin}
          icon={googleIcon}
          title="Google"
          disabled={disabled}
        />
        <SocialButton
          onPress={handleAppleLogin}
          icon={appleIcon}
          title="Apple"
          disabled={disabled}
        />
      </View>
    </>
  );
}
