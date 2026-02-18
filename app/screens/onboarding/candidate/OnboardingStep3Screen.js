import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TitleInput from "../../../components/common/TitleInput";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { useOnboarding } from "../../../context/OnboardingContext";
import { useAppTheme } from "../../../utils/theme";

export default function OnboardingStep1Screen({ navigation }) {
  const { formData, updateFormData } = useOnboarding();
  const { colors } = useAppTheme();

  const [skillInput, setSkillInput] = useState("");
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

  function handleSaveSkills() {
    if (!skillInput?.trim()) return;
    if (skills.length >= 5) return;
    if (skills.includes(skillInput.trim())) return;
    updateFormData("skills", [...skills, skillInput.trim()]);
    setSkillInput("");
  }

  function handleRemoveSkill(index) {
    updateFormData(
      "skills",
      skills.filter((_, i) => i !== index),
    );
  }

  function saveLinks(linkedin, github, website) {
    updateFormData("portfolioLinks", [linkedin, github, website]);
  }

  return (
    <OnboardingContainer
      currentStep={3}
      totalSteps={4}
      fields={fields}
      navigation={navigation}
      nextScreen={"Step4"}
      text="Almost there! Add your skills to stand out."
    >
      <TitleInput
        title="Professional Skills"
        subTitle="Add at least 5 skills to improve your visibility"
        placeholder="Add a skill (e.g. Figma)"
        iconName="search"
        value={skillInput}
        onChangeText={setSkillInput}
      >
        <TouchableOpacity
          onPress={handleSaveSkills}
          disabled={skills.length >= 5}
        >
          <Ionicons
            name="add-sharp"
            size={22}
            color={skills.length >= 5 ? colors.neutral400 : colors.brandPrimary}
          />
        </TouchableOpacity>
      </TitleInput>

      {skills.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mb-6">
          {skills.map((skill, index) => (
            <View
              key={index}
              className="flex-row items-center gap-3 justify-center rounded-xl px-3 py-1 h-10"
              style={{ backgroundColor: colors.neutral200 }}
            >
              <Text
                className="text-base font-semibold"
                style={{ color: colors.brandPrimary }}
              >
                {String(skill)}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveSkill(index)}>
                <Ionicons
                  name="close-sharp"
                  color={colors.brandPrimary}
                  size={16}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

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
