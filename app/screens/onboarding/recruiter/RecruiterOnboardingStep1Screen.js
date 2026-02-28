import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Text, View } from "react-native";
import TitleInput from "../../../components/common/TitleInput";
import CompanySizeButton from "../../../components/onboarding/CompanySizeButton";
import IndustryDropDown from "../../../components/onboarding/IndustryDropDown";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { useOnboarding } from "../../../context/OnboardingContext";
import { useAppTheme } from "../../../utils/theme";

export default function RecruiterOnboardingStep1Screen({ navigation }) {
  const { formData, updateFormData } = useOnboarding();
  const { colors } = useAppTheme();

  const companyWebsite = formData.companyWebsite;
  const industry = formData.industry;
  const companySize = formData.companySize;
  const companyDescription = formData.companyDescription;

  const fields = useMemo(
    () => [companyWebsite, industry, companySize, companyDescription],
    [companyWebsite, industry, companySize, companyDescription],
  );

  return (
    <OnboardingContainer
      currentStep={1}
      totalSteps={3}
      navigation={navigation}
      fields={fields}
      nextScreen="RecruiterOnboardingStep2"
      text="Tell candidates about your company. This information will be displayed on your job posts."
      variant="recruiter"
    >
      <TitleInput
        title="Company Website"
        placeholder="https://example.com"
        iconName="link"
        variant="recruiter"
        value={companyWebsite}
        onChangeText={(text) => updateFormData("companyWebsite", text)}
      />

      <IndustryDropDown industry={industry} updateFormData={updateFormData} />

      <CompanySizeButton
        companySize={companySize}
        updateFormData={updateFormData}
      />

      <TitleInput
        title="Company Description"
        placeholder="Tell us about your company culture, mission, and what makes it a great place to work..."
        height={150}
        value={companyDescription}
        variant="recruiter"
        onChangeText={(text) => updateFormData("companyDescription", text)}
      />
      <View
        className="p-4 rounded-2xl flex-row gap-3 items-start mb-2"
        style={{
          backgroundColor: colors.brandSecondary + "12",
          borderWidth: 1,
          borderColor: colors.brandSecondary + "25",
        }}
      >
        <Ionicons
          name="information-circle"
          size={20}
          color={colors.brandSecondary}
          style={{ marginTop: 1 }}
        />
        <View className="flex-1">
          <Text
            className="text-sm font-semibold mb-1"
            style={{ color: colors.brandSecondary }}
          >
            Why is this important?
          </Text>
          <Text
            className="text-xs leading-relaxed"
            style={{ color: colors.textSecondary }}
          >
            A complete profile increases trust with candidates and improves your
            job post visibility by 25%.
          </Text>
        </View>
      </View>
    </OnboardingContainer>
  );
}
