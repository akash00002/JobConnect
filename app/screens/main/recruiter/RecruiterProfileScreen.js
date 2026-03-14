import { Ionicons } from "@expo/vector-icons";
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
import PortfolioLinks from "../../../components/main/PortfolioLinks";
import ActiveJobs from "../../../components/recruiter_app/profile/ActiveJobs";
import RecruiterCompanyInfo from "../../../components/recruiter_app/profile/RecruiterCompanyInfo";
import RecruiterHero from "../../../components/recruiter_app/profile/RecruiterHero";
import StatCard from "../../../components/recruiter_app/profile/StatCard";
import { useProfile } from "../../../context/ProfileContext";
import { useAppTheme } from "../../../utils/theme";

export default function RecruiterProfileScreen({ navigation }) {
  const { profile, updateProfile } = useProfile();
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const recruiter = profile?.recruiter_profiles;

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
          onPress={() => navigation.navigate("Settings")}
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
          <RecruiterHero
            profile={profile}
            recruiter={recruiter}
            onPhotoChange={(uri) => updateProfile({ profilePhoto: uri })} // ← personal photo
            onLogoChange={(uri) => updateProfile({ companyLogo: uri })} // ← company logo
          />

          {/* Stats */}
          <View className="flex-row gap-2.5 px-4 mt-5">
            <StatCard label="Total Jobs" value="24" />
            <StatCard label="Active" value="12" highlight />
            <StatCard label="Hires" value="48" />
          </View>

          {/* Sections */}
          <View className="mt-4 px-4" style={{ gap: 16 }}>
            <AboutMe
              aboutMe={recruiter?.company_description}
              title="About Company"
              placeholder="Add a short description about your company"
              onSave={(text) => updateProfile({ companyDescription: text })}
            />
            <ActiveJobs />
            <RecruiterCompanyInfo
              recruiter={recruiter}
              onSave={(updates) => updateProfile(updates)}
            />
            <PortfolioLinks
              portfolioLinks={[
                recruiter?.linkedin_url,
                recruiter?.twitter_handle,
                recruiter?.company_website,
              ]}
              onSave={([linkedin, twitter, website]) =>
                updateProfile({
                  linkedinUrl: linkedin,
                  twitterHandle: twitter,
                  companyWebsite: website,
                })
              }
              variant="recruiter"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
