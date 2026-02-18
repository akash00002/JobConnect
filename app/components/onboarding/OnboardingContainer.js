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
}) {
  const { colors } = useAppTheme();
  const { getTotalProgress, formData } = useOnboarding();
  const [loading, setLoading] = useState(false);
  const { completeOnboarding } = useAuth();

  const { filledFields, totalFields } = useMemo(() => {
    const filled = fields.filter(
      (field) => field && field.trim() !== "",
    ).length;
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
      console.log("formData:", JSON.stringify(formData)); // ← check this
      const result = await onboardingService.saveProfile(formData);
      console.log("save result:", result); // ← check this
      completeOnboarding();
    } catch (error) {
      console.error("Save failed:", error); // ← check this
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
          globalFilledFields={getTotalProgress.filledFields}
          globalTotalFields={getTotalProgress.totalFields}
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
              title="Finish Profile"
              onPress={handleFinish}
              iconName="checkmark-circle-sharp"
              loading={loading}
            />
          ) : (
            <AuthButton title="Save & Continue" onPress={handleNext} />
          )}
          {currentStep !== totalSteps && (
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
