import { useMemo } from "react";
import TitleInput from "../../../components/common/TitleInput";
import CoverImage from "../../../components/onboarding/CoverImage";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import ProfilePhoto from "../../../components/onboarding/ProfilePhoto";
import { useOnboarding } from "../../../context/OnboardingContext";

export default function RecruiterOnboardingStep2Screen({ navigation }) {
  const { formData, updateFormData } = useOnboarding();

  const headquarters = formData.headquarters ?? "";
  const linkedinUrl = formData.linkedinUrl ?? "";
  const twitterHandle = formData.twitterHandle ?? "";

  const fields = useMemo(() => {
    const hasLogo = formData.companyLogo ? "filled" : "";
    const hasCoverImage = formData.coverImage ? "filled" : "";

    return [hasLogo, hasCoverImage, headquarters, linkedinUrl, twitterHandle];
  }, [
    formData.companyLogo,
    formData.coverImage,
    headquarters,
    linkedinUrl,
    twitterHandle,
  ]);

  return (
    <OnboardingContainer
      currentStep={2}
      totalSteps={3}
      navigation={navigation}
      fields={fields}
      nextScreen="RecruiterOnboardingStep3"
      text="Add visuals to attract top talent to your job board and stand out."
      variant="recruiter"
    >
      <ProfilePhoto variant="recruiter" />
      <CoverImage />
      <TitleInput
        title="Headquarters"
        placeholder="San Francisco, CA"
        iconName="location"
        value={headquarters}
        onChangeText={(text) => updateFormData("headquarters", text)}
        variant="recruiter"
      />
      <TitleInput
        title="LinkedIn Page"
        placeholder="linkedin.com/company/your-company"
        iconName="logo-linkedin"
        value={linkedinUrl}
        onChangeText={(text) => updateFormData("linkedinUrl", text)}
        variant="recruiter"
      />
      <TitleInput
        title="Twitter Handle"
        placeholder="@yourcompany"
        iconName="logo-twitter"
        value={twitterHandle}
        onChangeText={(text) => updateFormData("twitterHandle", text)}
        variant="recruiter"
      />
    </OnboardingContainer>
  );
}
