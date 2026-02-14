// screens/SignUpScreen.js
import { useState } from "react";
import { View } from "react-native";
import AuthFooter from "../../../components/auth/AuthFooter";
import AuthFormContainer from "../../../components/auth/AuthFormContainer";
import SocialLoginSection from "../../../components/auth/SocialLoginSection";
import AuthButton from "../../../components/common/Button";
import LabelInput from "../../../components/common/LabelInput";
import TermsCheckbox from "../../../features/terms/TermsCheckbox";

import FormDivider from "../../../components/common/FormDivider";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../features/toast/ToastContext";
import { useAuthForm } from "../../../hooks/useAuthForm";
import { useHaptics } from "../../../hooks/useHaptic";

export default function SignUpScreen({ navigation }) {
  const { candidateSignUp } = useAuth();
  const { candidateLogin } = useAuth();
  const { showToast } = useToast();
  const { impact, success, error } = useHaptics();
  const {
    errors,
    setErrors,
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    clearError,
    isLoading,
    setIsLoading,
  } = useAuthForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignUp = async () => {
    await impact();

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword,
    );

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      await error();
      return;
    }

    if (!termsAccepted) {
      showToast("Please accept Terms & Conditions to continue");
      await error();
      return;
    }

    setIsLoading(true);
    try {
      const result = await candidateSignUp(email, password, confirmPassword);

      if (result.success) {
        showToast("Sign Up successful! Please login to continue");
        await success();
        await candidateLogin(email, password);
        navigation.reset({
          index: 0,
          routes: [
            { name: "Onboarding", params: { screen: "PersonalDetails" } },
          ],
        });
      } else {
        showToast(
          result.error || "Please enter the email or password properly",
        );

        //later wee need to remove this using for development
        navigation.reset({
          index: 0,
          routes: [
            { name: "Onboarding", params: { screen: "PersonalDetails" } },
          ],
        });
        //later wee need to remove this using for development
        await error();
      }
    } catch {
      showToast("An unexpected error occurred");
      await error();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    impact();
    navigation.goBack();
  };

  return (
    <AuthFormContainer
      title="Create Account"
      subtitle="Sign up to start your search for the perfect career."
      decorativeBlurs="variant4"
    >
      {/* Form Section */}
      <View className="w-full">
        <LabelInput
          label="Full Name"
          iconName="person"
          autoCapitalize="words"
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name) clearError("name");
          }}
          autoCorrect={false}
          error={errors.name}
          editable={!isLoading}
        />
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
        <LabelInput
          label="Confirm Password"
          iconName="lock-closed"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) clearError("confirmPassword");
          }}
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.confirmPassword}
          editable={!isLoading}
        />
      </View>

      <TermsCheckbox checked={termsAccepted} onCheck={setTermsAccepted} />

      {/* Create Button */}
      <AuthButton
        title={isLoading ? "Creating Account..." : "Create Account"}
        onPress={handleSignUp}
        iconName="arrow-forward"
        loading={isLoading}
      />

      <FormDivider text="OR SIGN UP WITH" />

      {/* Social Login - No handlers needed! */}
      <SocialLoginSection disabled={isLoading} />

      {/* Footer */}
      <AuthFooter
        question="Already have an account?"
        actionText="Sign In"
        onPress={handleLogin}
      />
    </AuthFormContainer>
  );
}
