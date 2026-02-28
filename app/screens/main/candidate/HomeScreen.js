import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../../../components/common/Button";
import { useAuth } from "../../../context/AuthContext";
import { onboardingService } from "../../../services/OnboardingService";
import { useAppTheme } from "../../../utils/theme";

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { logout, user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const data = await onboardingService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  }

  const cp = profile?.candidate_profiles;
  const rp = profile?.recruiter_profiles;
  const isRecruiter = profile?.role === "recruiter";
  const photoUri = profile?.profile_photo || rp?.company_logo;

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.background }}
        className="items-center justify-center"
      >
        <ActivityIndicator size="large" color={colors.brandPrimary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="flex-1 px-6 py-4">
        <Text
          className="text-2xl font-bold mb-6"
          style={{ color: colors.text }}
        >
          Profile Data (Test)
        </Text>

        {/* Profile / Company Logo Photo */}
        <View className="items-center mb-6">
          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={{
                height: 96,
                width: 96,
                borderRadius: 48,
                borderWidth: 3,
                borderColor: colors.brandPrimary,
              }}
            />
          ) : (
            <View
              style={{
                height: 96,
                width: 96,
                borderRadius: 48,
                borderWidth: 3,
                borderColor: colors.neutral300,
                backgroundColor: colors.neutral200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: colors.textSecondary }}>No Photo</Text>
            </View>
          )}
        </View>

        {/* Cover Image (Recruiter only) */}
        {isRecruiter && rp?.cover_image && (
          <View className="mb-4 rounded-2xl overflow-hidden">
            <Image
              source={{ uri: rp.cover_image }}
              style={{ width: "100%", height: 150 }}
              resizeMode="cover"
            />
          </View>
        )}

        <Section title="Auth" colors={colors}>
          <Row label="Email" value={user?.email} colors={colors} />
          <Row label="Role" value={profile?.role} colors={colors} />
          <Row label="User ID" value={user?.id} colors={colors} />
        </Section>

        {/* ── Candidate Sections ── */}
        {!isRecruiter && (
          <>
            <Section title="Basic Info" colors={colors}>
              <Row label="Name" value={profile?.name} colors={colors} />
              <Row label="About Me" value={profile?.about_me} colors={colors} />
              <Row label="City" value={cp?.current_city} colors={colors} />
              <Row
                label="Postal Code"
                value={cp?.postal_code}
                colors={colors}
              />
              <Row
                label="Job Title"
                value={cp?.desired_job_title}
                colors={colors}
              />
            </Section>

            <Section title="Work Experience" colors={colors}>
              {cp?.work_experience?.length > 0 ? (
                cp.work_experience.map((exp, i) => (
                  <View key={i} className="mb-2">
                    <Row
                      label="Job Title"
                      value={exp.jobTitle}
                      colors={colors}
                    />
                    <Row
                      label="Company"
                      value={exp.companyName}
                      colors={colors}
                    />
                    <Row
                      label="Present"
                      value={exp.isPresent ? "Yes" : "No"}
                      colors={colors}
                    />
                  </View>
                ))
              ) : (
                <Text style={{ color: colors.textSecondary }}>
                  No work experience
                </Text>
              )}
            </Section>

            <Section title="Education" colors={colors}>
              {cp?.education?.length > 0 ? (
                cp.education.map((edu, i) => (
                  <View key={i} className="mb-2">
                    <Row label="Degree" value={edu.degree} colors={colors} />
                    <Row
                      label="Institution"
                      value={edu.institution}
                      colors={colors}
                    />
                  </View>
                ))
              ) : (
                <Text style={{ color: colors.textSecondary }}>
                  No education
                </Text>
              )}
            </Section>

            <Section title="Skills & Links" colors={colors}>
              <Row
                label="Skills"
                value={cp?.skills?.join(", ")}
                colors={colors}
              />
              <Row
                label="LinkedIn"
                value={cp?.portfolio_links?.[0]}
                colors={colors}
              />
              <Row
                label="GitHub"
                value={cp?.portfolio_links?.[1]}
                colors={colors}
              />
              <Row
                label="Website"
                value={cp?.portfolio_links?.[2]}
                colors={colors}
              />
              <Row label="Resume URL" value={cp?.resume} colors={colors} />
            </Section>
          </>
        )}

        {/* ── Recruiter Sections ── */}
        {isRecruiter && (
          <>
            <Section title="Basic Info" colors={colors}>
              <Row label="Name" value={profile?.name} colors={colors} />
              <Row label="About Me" value={profile?.about_me} colors={colors} />
              <Row label="Job Title" value={rp?.job_title} colors={colors} />
              <Row label="Work Phone" value={rp?.work_phone} colors={colors} />
            </Section>

            <Section title="Company Info" colors={colors}>
              <Row label="Company" value={rp?.company_name} colors={colors} />
              <Row label="Industry" value={rp?.industry} colors={colors} />
              <Row label="Size" value={rp?.company_size} colors={colors} />
              <Row
                label="Website"
                value={rp?.company_website}
                colors={colors}
              />
              <Row
                label="Location"
                value={rp?.company_location}
                colors={colors}
              />
              <Row
                label="Description"
                value={rp?.company_description}
                colors={colors}
              />
            </Section>

            <Section title="Social" colors={colors}>
              <Row label="LinkedIn" value={rp?.linkedin_url} colors={colors} />
              <Row label="Twitter" value={rp?.twitter_handle} colors={colors} />
            </Section>
          </>
        )}

        <View className="mt-4 mb-10">
          <AuthButton title="Logout" onPress={logout} variant="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children, colors }) {
  return (
    <View
      className="rounded-2xl p-4 mb-4"
      style={{ backgroundColor: colors.surface }}
    >
      <Text
        className="text-base font-bold mb-3"
        style={{ color: colors.brandPrimary }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function Row({ label, value, colors }) {
  return (
    <View className="flex-row justify-between py-1">
      <Text
        className="text-sm font-medium"
        style={{ color: colors.textSecondary }}
      >
        {label}
      </Text>
      <Text
        className="text-sm flex-1 text-right ml-4"
        style={{ color: colors.text }}
        numberOfLines={1}
      >
        {value || "—"}
      </Text>
    </View>
  );
}
