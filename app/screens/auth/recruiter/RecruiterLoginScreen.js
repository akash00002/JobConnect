// screens/RecruiterLoginScreen.js
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthFooter from "../../../components/auth/AuthFooter";
import AuthFormContainer from "../../../components/auth/AuthFormContainer";
import SocialLoginSection from "../../../components/auth/SocialLoginSection";
import AuthButton from "../../../components/common/Button";
import FormDivider from "../../../components/common/FormDivider";
import LabelInput from "../../../components/common/LabelInput";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../features/toast/ToastContext";
import { useAuthForm } from "../../../hooks/useAuthForm";
import { useHaptics } from "../../../hooks/useHaptic";
import { useAppTheme } from "../../../utils/theme";

export default function RecruiterLoginScreen({ navigation }) {
  const { colors } = useAppTheme();
  const { recruiterLogin } = useAuth();
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
      const result = await recruiterLogin(email, password);

      if (result.success) {
        showToast("Login successful!", "success");
        await success();
      } else {
        showToast(result.error || "Invalid email or password", "error");
        await error();
      }
    } catch {
      showToast("An unexpected error occurred", "error");
      await error();
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    impact();
    navigation.navigate("RecruiterSignUp");
  };

  const handleJobSeekerLogin = () => {
    impact();
    navigation.replace("Login");
  };

  return (
    <AuthFormContainer
      title="Recruiter Login"
      subtitle="Sign in to find the best talent for your company."
      decorativeBlurs="variant2"
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
          variant="recruiter"
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
          variant="recruiter"
        />
      </View>

      {/* Forgot Password */}
      <View className="items-end mb-2">
        <TouchableOpacity disabled={isLoading}>
          <Text
            className="text-sm font-medium"
            style={{ color: colors.brandSecondary }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <AuthButton
        title={isLoading ? "Logging in..." : "Login as Recruiter"}
        onPress={handleLogin}
        iconName="arrow-forward"
        loading={isLoading}
        variant="recruiter"
      />

      <FormDivider text="ENTERPRISE SSO" />

      {/* Social Login */}
      <SocialLoginSection disabled={isLoading} />

      {/* Footer */}
      <AuthFooter
        question="Post a job?"
        actionText="Create an account"
        onPress={handleSignUp}
        isRecruiter={true}
      />

      {/* Spacer */}
      <View className="flex-1 min-h-[24px]" />

      {/* Login as Job Seeker Link */}
      <View className="items-center py-4">
        <TouchableOpacity
          onPress={handleJobSeekerLogin}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          <Text className="text-sm" style={{ color: colors.textSecondary }}>
            Looking for a job?{" "}
            <Text
              className="font-semibold"
              style={{ color: colors.brandSecondary }}
            >
              Login as Job Seeker
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </AuthFormContainer>
  );
}
