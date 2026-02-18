// screens/onboarding/candidate/OnboardingStep1Screen.js
import { useMemo } from "react";
import TitleInput from "../../../components/common/TitleInput";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { useOnboarding } from "../../../context/OnboardingContext";

export default function OnboardingStep1Screen({ navigation }) {
  const { formData, updateFormData } = useOnboarding();

  const currentCity = formData.currentCity;
  const postalCode = formData.postalCode;
  const desiredJobTitle = formData.desiredJobTitle;

  const fields = useMemo(
    () => [currentCity, postalCode, desiredJobTitle],
    [currentCity, postalCode, desiredJobTitle],
  );

  return (
    <OnboardingContainer
      currentStep={1}
      totalSteps={4}
      fields={fields}
      navigation={navigation}
      nextScreen={"Step2"}
      text="Just a few more steps to find your dream job!"
    >
      <TitleInput
        title="Current City"
        placeholder="e.g., San Francisco"
        iconName="location"
        value={currentCity}
        onChangeText={(text) => updateFormData("currentCity", text)}
      />

      <TitleInput
        title="Postal Code"
        placeholder="e.g., 854301"
        iconName="map"
        value={postalCode}
        keyboardType="number-pad"
        onChangeText={(text) => updateFormData("postalCode", text)}
      />

      <TitleInput
        title="Desired Job Title"
        placeholder="e.g., Software Engineer"
        iconName="briefcase"
        value={desiredJobTitle}
        onChangeText={(text) => updateFormData("desiredJobTitle", text)}
      />
    </OnboardingContainer>
  );
}
