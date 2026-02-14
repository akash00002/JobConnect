// components/onboarding/ProgressBar.js
import { Text, View } from "react-native";
import { useAppTheme } from "../../utils/theme";

export default function ProgressBar({
  currentStep,
  totalSteps,
  filledFields, // Current step filled fields
  totalFields, // Current step total fields
  globalFilledFields, // ✅ Total filled across all steps
  globalTotalFields, // ✅ Total fields across all steps
}) {
  const { colors } = useAppTheme();

  // ✅ Calculate global progress percentage
  const globalProgress =
    globalTotalFields > 0 ? (globalFilledFields / globalTotalFields) * 100 : 0;

  return (
    <View className="w-full px-6 py-4">
      {/* Step Counter */}
      <View className="flex-row justify-between mb-2">
        <Text
          className="text-sm font-medium"
          style={{ color: colors.textSecondary }}
        >
          Step {currentStep} of {totalSteps}
        </Text>
        <Text
          className="text-sm font-medium"
          style={{ color: colors.brandPrimary }}
        >
          {Math.round(globalProgress)}% Complete
        </Text>
      </View>

      {/* Progress Bar - Shows global progress */}
      <View
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: colors.neutral200 }}
      >
        <View
          className="h-full rounded-full transition-all"
          style={{
            width: `${globalProgress}%`,
            backgroundColor: colors.brandPrimary,
          }}
        />
      </View>
    </View>
  );
}
