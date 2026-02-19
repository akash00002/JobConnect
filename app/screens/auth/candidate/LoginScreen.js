// screens/LoginScreen.js

import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthFooter from "../../../components/auth/AuthFooter";
import AuthFormContainer from "../../../components/auth/AuthFormContainer";
import RecruiterLink from "../../../components/auth/RecruiterLink";
import SocialLoginSection from "../../../components/auth/SocialLoginSection";
import AuthButton from "../../../components/common/Button";
import FormDivider from "../../../components/common/FormDivider";
import LabelInput from "../../../components/common/LabelInput";

import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../features/toast/ToastContext";
import { useAuthForm } from "../../../hooks/useAuthForm";
import { useHaptics } from "../../../hooks/useHaptic";
import { useAppTheme } from "../../../utils/theme";

import { authService } from "../../../services/authService";

export default function LoginScreen({ navigation }) {
  const { colors } = useAppTheme();
  const { candidateLogin } = useAuth();
  const { showToast } = useToast();
  const { impact, success, error } = useHaptics();

  const {
    errors,
    setErrors,
    validateEmail,
    validatePassword,
    clearError,
    isLoading,
    setIsLoading,
  } = useAuthForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await impact();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      await error();
      return;
    }

    setIsLoading(true);

    try {
      const result = await candidateLogin(email.trim(), password);

      if (result.success) {
        showToast("Login successful!", "success");
        await success();
      } else {
        showToast(result.error || "Invalid email or password", "error");
        await error();
      }
    } catch {
      showToast("Something went wrong. Please try again.", "error");
      await error();
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ NEW: Forgot Password Handler (Supabase)
  const handleForgotPassword = async () => {
    if (!email) {
      showToast("Enter your email first", "error");
      return;
    }

    const result = await authService.forgotPassword(email.trim());

    if (result.success) {
      showToast("Password reset email sent!", "success");
    } else {
      showToast(result.error, "error");
    }
  };

  const handleSignUp = () => {
    impact();
    navigation.navigate("SignUp");
  };

  const handleRecruiterLogin = () => {
    impact();
    navigation.replace("RecruiterLogin");
  };

  return (
    <AuthFormContainer
      title="Welcome to JobConnect"
      subtitle="Login to continue your search for the perfect career."
      decorativeBlurs="variant1"
    >
      {/* Form Section */}
      <View className="w-full">
        <LabelInput
          label="Email Address"
          iconName="mail"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) clearError("email");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.email}
          editable={!isLoading}
        />

        <LabelInput
          label="Password"
          iconName="lock-closed"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) clearError("password");
          }}
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.password}
          editable={!isLoading}
        />
      </View>

      {/* 🔥 UPDATED: Forgot Password now connected to Supabase */}
      <View className="items-end mb-2">
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleForgotPassword} // ✅ ADDED
        >
          <Text
            className="text-sm font-medium"
            style={{ color: colors.brandPrimary }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <AuthButton
        title={isLoading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        iconName="arrow-forward"
        loading={isLoading}
      />

      <FormDivider />

      <SocialLoginSection disabled={isLoading} />

      <AuthFooter
        question="Don't have an account?"
        actionText="Sign Up"
        onPress={handleSignUp}
      />

      <View className="flex-1 min-h-[24px]" />

      <RecruiterLink onPress={handleRecruiterLogin} />
    </AuthFormContainer>
  );
}
