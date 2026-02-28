import { MaterialIcons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Text, View } from "react-native";
import DocumentUpload from "../../../components/common/DocumentUpload";
import TitleInput from "../../../components/common/TitleInput";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";
import { useOnboarding } from "../../../context/OnboardingContext";
import { useAppTheme } from "../../../utils/theme";

export default function RecruiterOnboardingStep3Screen({ navigation }) {
  const { formData, updateFormData } = useOnboarding();
  const { colors } = useAppTheme();

  const jobTitle = formData.jobTitle;
  const workPhone = formData.workPhone;
  const businessDocument = formData.businessVerificationDocument;

  const fields = useMemo(() => {
    const hasDocument = businessDocument ? "filled" : "";
    return [jobTitle, workPhone, hasDocument];
  }, [jobTitle, workPhone, businessDocument]);

  return (
    <OnboardingContainer
      currentStep={3}
      totalSteps={3}
      fields={fields}
      navigation={navigation}
      text="Please provide your role details to help us verify your account and maintain a trusted community."
      variant="recruiter"
      nextScreen="HomeScreen"
    >
      <TitleInput
        title="Your Job Title"
        placeholder="e.g. Senior Talent Acquisition"
        value={jobTitle}
        onChangeText={(text) => updateFormData("jobTitle", text)}
        materialIcon="badge"
        variant="recruiter"
      />
      <TitleInput
        title="Work Phone Number"
        placeholder="+91 0000-0000-00"
        keyboardType="number-pad"
        value={workPhone}
        onChangeText={(text) => updateFormData("workPhone", text)}
        iconName="call"
        variant="recruiter"
      />
      <View className="flex-row items-center ml-1 gap-2 bottom-2">
        <MaterialIcons name="lock" size={18} color={colors.neutral600} />
        <Text style={{ color: colors.neutral600 }}>
          Used for verfification purposes only.
        </Text>
      </View>

      <View className="mt-4" />

      <DocumentUpload
        title="Business Verification"
        uploadLabel="Upload Document"
        fileTypeLabel="Business card, ID, or offer letter"
        variant="recruiter"
        formDataKey="businessVerificationDocument"
        optional
      />
    </OnboardingContainer>
  );
}
