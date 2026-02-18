import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../../../components/common/Button";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../services/api";
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
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      console.log("profile photo:", data?.profile_photo);
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  }

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

        {/* Profile Photo */}
        {profile?.profile_photo ? (
          <View className="items-center mb-6">
            <Image
              source={{ uri: profile.profile_photo }}
              style={{
                height: 96,
                width: 96,
                borderRadius: 48,
                borderWidth: 3,
                borderColor: colors.brandPrimary,
              }}
            />
          </View>
        ) : (
          <View className="items-center mb-6">
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
          </View>
        )}

        {/* Auth Info */}
        <Section title="Auth" colors={colors}>
          <Row label="Email" value={user?.email} colors={colors} />
          <Row label="User ID" value={user?.id} colors={colors} />
        </Section>

        {/* Step 1 */}
        <Section title="Step 1 — Basic Info" colors={colors}>
          <Row label="City" value={profile?.current_city} colors={colors} />
          <Row
            label="Postal Code"
            value={profile?.postal_code}
            colors={colors}
          />
          <Row
            label="Job Title"
            value={profile?.desired_job_title}
            colors={colors}
          />
        </Section>

        {/* Step 2 */}
        <Section title="Step 2 — Work Experience" colors={colors}>
          {profile?.work_experience?.length > 0 ? (
            profile.work_experience.map((exp, i) => (
              <View key={i} className="mb-2">
                <Row label="Job Title" value={exp.jobTitle} colors={colors} />
                <Row label="Company" value={exp.companyName} colors={colors} />
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

        <Section title="Step 2 — Education" colors={colors}>
          {profile?.education?.length > 0 ? (
            profile.education.map((edu, i) => (
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
            <Text style={{ color: colors.textSecondary }}>No education</Text>
          )}
        </Section>

        {/* Step 3 */}
        <Section title="Step 3 — Skills & Links" colors={colors}>
          <Row
            label="Skills"
            value={profile?.skills?.join(", ")}
            colors={colors}
          />
          <Row
            label="LinkedIn"
            value={profile?.portfolio_links?.[0]}
            colors={colors}
          />
          <Row
            label="GitHub"
            value={profile?.portfolio_links?.[1]}
            colors={colors}
          />
          <Row
            label="Website"
            value={profile?.portfolio_links?.[2]}
            colors={colors}
          />
        </Section>

        {/* Step 4 */}
        <Section title="Step 4 — Photo & Resume" colors={colors}>
          <Row
            label="Photo URL"
            value={profile?.profile_photo}
            colors={colors}
          />
          <Row label="Resume URL" value={profile?.resume} colors={colors} />
          <Row label="About Me" value={profile?.about_me} colors={colors} />
        </Section>

        {/* Logout */}
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
