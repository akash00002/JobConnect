import { useState } from "react";
import { View } from "react-native";
import AuthFooter from "../../../components/auth/AuthFooter";
import AuthFormContainer from "../../../components/auth/AuthFormContainer";
import SocialLoginSection from "../../../components/auth/SocialLoginSection";
import AuthButton from "../../../components/common/Button";
import FormDivider from "../../../components/common/FormDivider";
import LabelInput from "../../../components/common/LabelInput";
import { useAuth } from "../../../context/AuthContext";
import TermsCheckbox from "../../../features/terms/TermsCheckbox";
import { useToast } from "../../../features/toast/ToastContext";
import { useAuthForm } from "../../../hooks/useAuthForm";
import { useHaptics } from "../../../hooks/useHaptic";

export default function RecruiterSignUpScreen({ navigation }) {
  const { recruiterSignUp } = useAuth();
  const { showToast } = useToast();
  const { impact, success, error } = useHaptics();

  // Destructure what we need from your custom hook
  const {
    errors,
    setErrors,
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateCompanyName,
    clearError,
    isLoading,
    setIsLoading,
  } = useAuthForm();

  // 1. CONSOLIDATED STATE: Group all fields into one object
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  // 2. GENERIC HANDLER: Updates state and clears errors dynamically
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) clearError(field);
  };

  const handleSignUp = async () => {
    await impact();

    const {
      name,
      email,
      companyName,
      password,
      confirmPassword,
      termsAccepted,
    } = form;

    // Validation
    const validationErrors = {
      name: validateName(name),
      email: validateEmail(email),
      companyName: validateCompanyName(companyName),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };

    // Check if any errors exist
    if (Object.values(validationErrors).some((err) => err)) {
      setErrors(validationErrors);
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
      const result = await recruiterSignUp({
        name: name.trim(),
        email: email.trim(),
        companyName,
        password,
      });

      if (result.success) {
        navigation.replace("RecruiterLogin");
        showToast("Account created! Please login to continue");
        await success();
      } else {
        showToast(result.error || "Failed to create account");
        await error();
      }
    } catch {
      showToast("An unexpected error occurred");
      await error();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormContainer
      title="Create Recruiter Account"
      subtitle="Join as a recruiter to find the best talent."
      decorativeBlurs="variant3"
    >
      <View className="w-full">
        <LabelInput
          label="Full Name"
          iconName="person"
          autoCapitalize="words"
          // 3. CLEANER PROPS
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          autoCorrect={false}
          error={errors.name}
          editable={!isLoading}
          variant="recruiter"
        />
        <LabelInput
          label="Company Name"
          iconName="business"
          autoCapitalize="words"
          value={form.companyName}
          onChangeText={(text) => handleChange("companyName", text)}
          autoCorrect={false}
          error={errors.companyName}
          editable={!isLoading}
          variant="recruiter"
        />
        <LabelInput
          label="Email Address"
          iconName="mail"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
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
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.password}
          editable={!isLoading}
          variant="recruiter"
        />
        <LabelInput
          label="Confirm Password"
          iconName="lock-closed"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.confirmPassword}
          editable={!isLoading}
          variant="recruiter"
        />
      </View>

      <TermsCheckbox
        checked={form.termsAccepted}
        onCheck={(val) => handleChange("termsAccepted", val)}
        isRecruiter={true}
      />

      <AuthButton
        title={isLoading ? "Creating Account..." : "Create Account"}
        onPress={handleSignUp}
        iconName="arrow-forward"
        loading={isLoading}
        variant="recruiter"
      />

      <FormDivider text="OR SIGN UP WITH" />
      <SocialLoginSection disabled={isLoading} />

      <AuthFooter
        question="Already have a recruiter account?"
        actionText="Sign In"
        onPress={() => {
          impact();
          navigation.goBack();
        }}
        isRecruiter={true}
      />
    </AuthFormContainer>
  );
}
