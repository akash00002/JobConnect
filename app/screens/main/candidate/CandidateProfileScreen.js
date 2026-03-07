import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AboutMe from "../../../components/main/AboutMe";
import ExperienceSection from "../../../components/main/ExperienceSection";
import PortfolioLinks from "../../../components/main/PortfolioLinks";
import ProfileName from "../../../components/main/ProfileName";
import ProfilePhotoDisplay from "../../../components/main/ProfilePhotoDisplay";
import Resume from "../../../components/main/Resume";
import Skills from "../../../components/main/Skills";
import { useProfile } from "../../../hooks/useProfile";
import { useAppTheme } from "../../../utils/theme";

export default function CandidateProfileScreen({ navigation }) {
  const { profile, loading, updateProfile, refetch } = useProfile();
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();

  function handleSettings() {
    navigation.navigate("Settings");
  }

  // Refetch every time screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: insets.top,
      }}
    >
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-3"
        style={{ backgroundColor: colors.background }}
      >
        <Text
          className="text-2xl font-bold tracking-tight"
          style={{ color: colors.text }}
        >
          My Profile
        </Text>
        <TouchableOpacity
          className="p-2 rounded-full"
          style={{
            backgroundColor: isDark ? colors.neutral800 : colors.neutral200,
          }}
          onPress={handleSettings}
        >
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center pt-6 gap-3 px-6">
            <ProfilePhotoDisplay
              photo={profile?.profile_photo}
              onPhotoChange={(uri) => updateProfile({ profilePhoto: uri })}
            />
            <ProfileName
              name={profile?.name}
              jobTitle={
                profile?.candidate_profiles?.work_experience?.[0]?.jobTitle
              }
              location={profile?.candidate_profiles?.current_city}
            />
            <AboutMe
              aboutMe={profile?.about_me}
              onSave={(text) => updateProfile({ aboutMe: text })}
            />
            <Resume
              resume={profile?.candidate_profiles?.resume}
              onSave={(file) => updateProfile({ resume: file })}
            />
            <ExperienceSection
              title="Experience"
              items={profile?.candidate_profiles?.work_experience}
              iconName="briefcase-outline"
              emptyText="No experience added yet"
              fieldOneLabel="JOB TITLE"
              fieldOnePlaceholder="e.g. Software Engineer"
              fieldOneIcon="briefcase-outline"
              fieldTwoLabel="COMPANY NAME"
              fieldTwoPlaceholder="e.g. Google"
              fieldTwoIcon="business-outline"
              checkboxLabel="I currently work here"
              addButtonTitle="Add Experience"
              saveButtonTitle="Save Changes"
              listMarginBottom={-16}
              mapToForm={(item) => ({
                fieldOne: item.jobTitle,
                fieldTwo: item.companyName,
                startDate: item.startDate,
                endDate: item.endDate,
                isPresent: item.isPresent || false,
              })}
              mapFromForm={(formData) => ({
                jobTitle: formData.fieldOne,
                companyName: formData.fieldTwo,
                startDate: formData.startDate,
                endDate: formData.endDate,
                isPresent: formData.isPresent,
              })}
              onSave={(updated) => updateProfile({ workExperience: updated })}
            />
            <ExperienceSection
              title="Education"
              items={profile?.candidate_profiles?.education}
              iconName="school-outline"
              emptyText="No education details added yet"
              fieldOneLabel="DEGREE"
              fieldOnePlaceholder="e.g. B.S. Computer Science"
              fieldOneIcon="school-outline"
              fieldTwoLabel="INSTITUTION"
              fieldTwoPlaceholder="e.g. MIT"
              fieldTwoIcon="business-outline"
              checkboxLabel="I currently study here"
              addButtonTitle="Add Education"
              saveButtonTitle="Save Changes"
              listMarginBottom={0}
              mapToForm={(item) => ({
                fieldOne: item.degree,
                fieldTwo: item.institution,
                startDate: item.startDate,
                endDate: item.endDate,
                isPresent: item.isPresent || false,
              })}
              mapFromForm={(formData) => ({
                degree: formData.fieldOne,
                institution: formData.fieldTwo,
                startDate: formData.startDate,
                endDate: formData.endDate,
                isPresent: formData.isPresent,
              })}
              onSave={(updated) => updateProfile({ education: updated })}
            />
            <Skills
              skills={profile?.candidate_profiles?.skills}
              onSave={(updated) => updateProfile({ skills: updated })}
            />
            <PortfolioLinks
              portfolioLinks={profile?.candidate_profiles?.portfolio_links}
              onSave={(updated) => updateProfile({ portfolioLinks: updated })}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
