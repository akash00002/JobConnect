import { useMemo } from "react";
import { View } from "react-native";
import Resume from "../../../components/common/DocumentUpload";
import AboutMeInput from "../../../components/onboarding/AboutMeInput";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import ProfilePhoto from "../../../components/onboarding/ProfilePhoto";
import { useOnboarding } from "../../../context/OnboardingContext";

export default function OnboardingStep4Screen({ navigation }) {
  const { formData } = useOnboarding();

  const fields = useMemo(() => {
    const hasPhoto = formData.profilePhoto ? "filled" : "";
    const hasResume = formData.resume ? "filled" : "";
    const hasAboutMe = formData.aboutMe ? "filled" : "";
    return [hasPhoto, hasResume, hasAboutMe];
  }, [formData.profilePhoto, formData.resume, formData.aboutMe]);

  return (
    <OnboardingContainer
      currentStep={4}
      totalSteps={4}
      fields={fields}
      navigation={navigation}
      text="Add a photo and resume to stand out"
    >
      <ProfilePhoto />
      <View className="mb-5" />

      <Resume />

      <AboutMeInput />
    </OnboardingContainer>
  );
}
