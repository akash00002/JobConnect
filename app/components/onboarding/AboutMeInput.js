import { useOnboarding } from "../../context/OnboardingContext";
import TitleInput from "../common/TitleInput";

export default function AboutMeInput() {
  const { formData, updateFormData } = useOnboarding();
  const aboutMe = formData.aboutMe;

  return (
    <TitleInput
      title="About Me"
      placeholder="Tell recruiters briefly about yourself, your key skills, and what you are looking for..."
      height={150}
      value={aboutMe}
      onChangeText={(text) => updateFormData("aboutMe", text)}
    />
  );
}
