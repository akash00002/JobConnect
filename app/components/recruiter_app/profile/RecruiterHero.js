import { Image, Text, View } from "react-native";
import { useAppTheme } from "../../../utils/theme";
import ProfilePhotoDisplay from "../../main/ProfilePhotoDisplay";

export default function RecruiterHero({
  profile,
  recruiter,
  onPhotoChange,
  onLogoChange,
}) {
  const { colors, isDark } = useAppTheme();

  const companyLogoUrl =
    recruiter?.company_logo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(recruiter?.company_name || "Co")}&size=200&background=4f46e5&color=fff&bold=true`;

  return (
    <View className="items-center pt-6 px-6 gap-3">
      {/* Photo with online dot */}
      <ProfilePhotoDisplay
        photo={profile?.profile_photo}
        onPhotoChange={onPhotoChange}
        variant="recruiter"
      />

      {/* Name + Title + Badge */}
      <View className="items-center gap-1">
        <Text className="text-2xl font-bold" style={{ color: colors.text }}>
          {profile?.name || "Your Name"}
        </Text>
        <Text
          className="text-base font-semibold"
          style={{ color: colors.brandSecondary }}
        >
          {recruiter?.job_title || "Job Title"}
        </Text>

        {/* Company badge */}
        <View
          className="flex-row items-center gap-2 mt-1 px-3 py-1.5 rounded-full"
          style={{
            backgroundColor: isDark ? colors.neutral800 : colors.neutral100,
          }}
        >
          <View
            className="w-5 h-5 rounded overflow-hidden"
            style={{ backgroundColor: colors.surface }}
          >
            <Image
              source={{ uri: companyLogoUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>
          <Text
            className="text-sm font-medium"
            style={{ color: colors.textSecondary }}
          >
            {recruiter?.company_name || "Company Name"}
            {recruiter?.company_location
              ? ` • ${recruiter.company_location}`
              : ""}
          </Text>
        </View>
      </View>
    </View>
  );
}
