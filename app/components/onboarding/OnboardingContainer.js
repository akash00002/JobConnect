import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { useOnboarding } from "../../context/OnboardingContext";
import { onboardingService } from "../../services/OnboardingService";
import { useAppTheme } from "../../utils/theme";
import AuthButton from "../common/Button";
import ProgressBar from "./ProgressBar";

export default function OnboardingContainer({
  children,
  currentStep,
  totalSteps,
  fields = [],
  navigation,
  nextScreen,
  text,
  variant,
}) {
  const { colors } = useAppTheme();
  const { getCandidateProgress, getRecruiterProgress, formData } =
    useOnboarding();
  const [loading, setLoading] = useState(false);
  const { completeOnboarding } = useAuth();

  const { filledFields, totalFields } = useMemo(() => {
    const filled = fields.filter((field) => {
      if (!field) return false;
      if (Array.isArray(field)) return field.length > 0;
      if (typeof field === "string") return field.trim() !== "";
      return true;
    }).length;
    return { filledFields: filled, totalFields: fields.length };
  }, [fields]);

  const handleNext = () => {
    navigation.navigate(nextScreen);
  };

  const handleSkip = () => {
    navigation.navigate(nextScreen);
  };

  const handleFinish = async () => {
    try {
      setLoading(true);
      if (variant === "recruiter") {
        await onboardingService.saveRecruiterProfile(formData);
      } else {
        await onboardingService.saveCandidateProfile(formData);
      }
      completeOnboarding();
    } catch (error) {
      console.error("Failed to save profile:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        edges={["left", "right", "bottom"]}
        className="flex-1 pt-5"
        style={{ backgroundColor: colors.background }}
        keyboardShouldPersistTaps="handled"
      >
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          filledFields={filledFields}
          totalFields={totalFields}
          globalFilledFields={
            variant === "recruiter"
              ? getRecruiterProgress.filledFields
              : getCandidateProgress.filledFields
          }
          globalTotalFields={
            variant === "recruiter"
              ? getRecruiterProgress.totalFields
              : getCandidateProgress.totalFields
          }
          variant={variant}
        />
        <ScrollView className="flex-1 px-6" keyboardShouldPersistTaps="handled">
          <View className="py-2">
            <Text
              className="text-lg mb-6"
              style={{ color: colors.textSecondary }}
            >
              {text}
            </Text>
            {children}
          </View>
        </ScrollView>

        <View className="px-6 gap-3">
          {currentStep === totalSteps ? (
            <AuthButton
              title={
                variant === "recruiter" ? "Complete Setup" : "Finish Profile"
              }
              onPress={handleFinish}
              variant={variant}
              iconName="checkmark-circle-sharp"
              loading={loading}
            />
          ) : (
            <AuthButton
              title={variant === "recruiter" ? "Continue" : "Save & Continue"}
              variant={variant}
              onPress={handleNext}
              iconName="arrow-forward"
            />
          )}
          {currentStep !== totalSteps && variant !== "recruiter" && (
            <AuthButton
              title="Skip for now"
              onPress={handleSkip}
              variant="ghost"
            />
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
