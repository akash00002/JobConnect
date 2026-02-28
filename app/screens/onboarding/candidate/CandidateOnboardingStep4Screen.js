import { useMemo } from "react";
import { View } from "react-native";
import Resume from "../../../components/common/DocumentUpload";
import TitleInput from "../../../components/common/TitleInput";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import ProfilePhoto from "../../../components/onboarding/ProfilePhoto";
import { useOnboarding } from "../../../context/OnboardingContext";

export default function OnboardingStep4Screen({ navigation }) {
  const { formData, updateFormData } = useOnboarding();

  const aboutMe = formData.aboutMe;

  const fields = useMemo(() => {
    const hasPhoto = formData.profilePhoto ? "filled" : "";
    const hasResume = formData.resume ? "filled" : "";
    return [hasPhoto, hasResume];
  }, [formData.profilePhoto, formData.resume]);

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

      <TitleInput
        title="About Me"
        placeholder="Tell recruiters briefly about yourself, your key skills, and what you are looking for..."
        height={150}
        value={aboutMe}
        onChangeText={(text) => updateFormData("aboutMe", text)}
      />
    </OnboardingContainer>
  );
}
