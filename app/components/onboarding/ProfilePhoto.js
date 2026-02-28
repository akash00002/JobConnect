import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import { useAppTheme } from "../../utils/theme";
import TouchableScale from "../common/TouchableScale";

export default function ProfilePhoto({ variant }) {
  const { colors, isDark } = useAppTheme();
  const { formData, updateFormData } = useOnboarding();

  const isRecruiter = variant === "recruiter";

  const [photo, setPhoto] = useState(
    isRecruiter ? formData.companyLogo || null : formData.profilePhoto || null,
  );

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: isRecruiter ? [1, 1] : [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      if (isRecruiter) {
        updateFormData("companyLogo", uri); // 👈 recruiter saves to companyLogo
      } else {
        updateFormData("profilePhoto", uri); // 👈 candidate saves to profilePhoto
      }
    }
  }

  // ── Recruiter Style (square logo + side text) ──
  if (isRecruiter) {
    return (
      <View className="mb-6">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-bold" style={{ color: colors.text }}>
            Company Logo
          </Text>
          <View
            className="px-2 py-1 rounded-lg"
            style={{
              backgroundColor: isDark ? colors.neutral700 : colors.neutral200,
            }}
          >
            <Text
              className="text-xs font-medium"
              style={{ color: colors.textSecondary }}
            >
              Recommended 400x400
            </Text>
          </View>
        </View>

        <View className="flex-row items-start gap-4">
          {/* Logo Box */}
          <TouchableScale onPress={handlePickImage}>
            <View
              className="w-28 h-28 rounded-2xl items-center justify-center overflow-hidden"
              style={{
                borderWidth: 2,
                borderStyle: "dashed",
                borderColor: photo
                  ? colors.brandSecondary
                  : isDark
                    ? colors.neutral600
                    : colors.neutral300,
                backgroundColor: isDark ? colors.neutral800 : colors.surface,
              }}
            >
              {photo ? (
                <Image
                  source={{ uri: photo }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <Ionicons
                    name="camera"
                    size={32}
                    color={colors.brandSecondary}
                  />
                  <Text
                    className="text-[10px] font-semibold mt-1 uppercase tracking-wide"
                    style={{ color: colors.textSecondary }}
                  >
                    Upload
                  </Text>
                </View>
              )}
            </View>
          </TouchableScale>

          {/* Help Text */}
          <View className="flex-1 pt-2">
            <Text
              className="text-sm leading-snug"
              style={{ color: colors.textSecondary }}
            >
              Upload a high-quality version of your logo. This will appear on
              your job posts and company profile.
            </Text>
            {photo && (
              <TouchableScale onPress={handlePickImage} className="mt-3">
                <Text
                  className="text-sm font-semibold"
                  style={{ color: colors.brandSecondary }}
                >
                  Change Logo
                </Text>
              </TouchableScale>
            )}
          </View>
        </View>
      </View>
    );
  }

  // ── Candidate Style (circular photo) ──
  return (
    <View className="items-center">
      <View className="relative">
        <View
          className="h-36 w-36 items-center justify-center rounded-full overflow-hidden"
          style={{
            backgroundColor: isDark ? colors.neutral700 : colors.neutral200,
            borderWidth: 4,
            borderColor: colors.surface,
          }}
        >
          {photo ? (
            <Image source={{ uri: photo }} className="h-full w-full" />
          ) : (
            <Ionicons name="person-sharp" size={50} color={colors.neutral400} />
          )}
        </View>
        <TouchableScale
          onPress={handlePickImage}
          className="h-12 w-10 items-center justify-center rounded-full absolute bottom-2 right-0"
          style={{
            backgroundColor: colors.brandPrimary,
            borderWidth: 2,
            borderColor: colors.surface,
          }}
        >
          <Ionicons name="camera" size={18} color={colors.surface} />
        </TouchableScale>
      </View>
      <TouchableScale className="mt-3" onPress={handlePickImage}>
        <Text style={{ color: colors.brandPrimary }}>Upload Profile Photo</Text>
      </TouchableScale>
    </View>
  );
}
