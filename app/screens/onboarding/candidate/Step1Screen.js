// screens/onboarding/candidate/OnboardingStep1Screen.js
import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../../../components/common/Button";
import TitleInput from "../../../components/common/TitleInput";
import ProgressBar from "../../../components/onboarding/ProgressBar";
import { useOnboarding } from "../../../context/OnboardingContext";
import { useAppTheme } from "../../../utils/theme";

export default function OnboardingStep1Screen({ navigation }) {
  const { colors } = useAppTheme();
  const { formData, updateFormData, getTotalProgress } = useOnboarding(); // ✅ Use updateFormData

  // ✅ Use context state directly, no local state
  const currentCity = formData.currentCity;
  const postalCode = formData.postalCode;
  const desiredJobTitle = formData.desiredJobTitle;

  // Calculate filled fields in current step (for visual feedback)
  const { filledFields, totalFields } = useMemo(() => {
    const fields = [currentCity, postalCode, desiredJobTitle];
    const filled = fields.filter(
      (field) => field && field.trim() !== "",
    ).length;
    return { filledFields: filled, totalFields: fields.length };
  }, [currentCity, postalCode, desiredJobTitle]);

  const handleNext = () => {
    // Navigate to next step (data already saved in context)
    navigation.navigate("Step2");
  };

  const handleSkip = () => {
    navigation.navigate("Step2");
  };

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      className="flex-1 pt-5"
      style={{ backgroundColor: colors.background }}
    >
      <ProgressBar
        currentStep={1}
        totalSteps={4}
        filledFields={filledFields}
        totalFields={totalFields}
        globalFilledFields={getTotalProgress.filledFields}
        globalTotalFields={getTotalProgress.totalFields}
      />

      <ScrollView className="flex-1 px-6">
        <View className="py-2">
          <Text
            className="text-base mb-6"
            style={{ color: colors.textSecondary }}
          >
            Just a few more steps to find your dream job!
          </Text>

          <TitleInput
            title="Current City"
            placeholder="e.g., San Francisco"
            iconName="location"
            value={currentCity}
            onChangeText={(text) => updateFormData("currentCity", text)} // ✅ Update context directly
          />

          <TitleInput
            title="Postal Code"
            placeholder="e.g., 854301"
            iconName="map"
            value={postalCode}
            onChangeText={(text) => updateFormData("postalCode", text)} // ✅ Update context directly
          />

          <TitleInput
            title="Desired Job Title"
            placeholder="e.g., Software Engineer"
            iconName="briefcase"
            value={desiredJobTitle}
            onChangeText={(text) => updateFormData("desiredJobTitle", text)} // ✅ Update context directly
          />
        </View>
      </ScrollView>

      <View className="px-6 pb-6 gap-3">
        <AuthButton title="Save & Continue" onPress={handleNext} />
        <AuthButton title="Skip for now" onPress={handleSkip} variant="ghost" />
      </View>
    </SafeAreaView>
  );
}
