import { useMemo, useState } from "react";
import TitleInput from "../../../components/common/TitleInput";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import SkillsInput from "../../../components/onboarding/SkillsInput";
import { useOnboarding } from "../../../context/OnboardingContext";

export default function OnboardingStep1Screen({ navigation }) {
  const { formData, updateFormData } = useOnboarding();

  const [linkedinUrl, setLinkedinUrl] = useState(
    formData.portfolioLinks?.[0] || "",
  );
  const [githubUrl, setGithubUrl] = useState(
    formData.portfolioLinks?.[1] || "",
  );
  const [websiteUrl, setWebsiteUrl] = useState(
    formData.portfolioLinks?.[2] || "",
  );

  const skills = formData.skills || [];

  const fields = useMemo(() => {
    const hasSkills = skills.length > 0 ? "filled" : "";
    const hasLinks = linkedinUrl || githubUrl || websiteUrl ? "filled" : "";
    return [hasSkills, hasLinks];
  }, [skills.length, linkedinUrl, githubUrl, websiteUrl]);

  function saveLinks(linkedin, github, website) {
    updateFormData("portfolioLinks", [linkedin, github, website]);
  }

  return (
    <OnboardingContainer
      currentStep={3}
      totalSteps={4}
      fields={fields}
      navigation={navigation}
      nextScreen={"CandidateOnboardingStep4"}
      text="Almost there! Add your skills to stand out."
    >
      {/* ✅ Just SkillsInput — no duplicate TitleInput */}
      <SkillsInput
        skills={formData.skills}
        onChange={(updated) => updateFormData("skills", updated)}
      />

      <TitleInput
        title="Portfolio & Social Links"
        placeholder="LinkedIn Profile URL"
        iconName="logo-linkedin"
        value={linkedinUrl}
        onChangeText={(text) => {
          setLinkedinUrl(text);
          saveLinks(text, githubUrl, websiteUrl);
        }}
      />
      <TitleInput
        placeholder="GitHub Profile URL"
        iconName="logo-github"
        value={githubUrl}
        onChangeText={(text) => {
          setGithubUrl(text);
          saveLinks(linkedinUrl, text, websiteUrl);
        }}
      />
      <TitleInput
        placeholder="Personal Website URL"
        iconName="link"
        value={websiteUrl}
        onChangeText={(text) => {
          setWebsiteUrl(text);
          saveLinks(linkedinUrl, githubUrl, text);
        }}
      />
    </OnboardingContainer>
  );
}
