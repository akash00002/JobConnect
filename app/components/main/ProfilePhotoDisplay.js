import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import { onboardingService } from "../../services/OnboardingService";
import { useAppTheme } from "../../utils/theme";
import TouchableScale from "../common/TouchableScale";

export default function ProfilePhotoDisplay({
  photo,
  onPhotoChange,
  variant = "candidate",
}) {
  const { colors, isDark } = useAppTheme();
  const { updateFormData } = useOnboarding();
  const [localPhoto, setLocalPhoto] = useState(null);
  const isRecruiter = variant === "recruiter";

  useEffect(() => {
    if (photo) setLocalPhoto(photo); // ← update when parent passes photo
    console.log("Profile photo URL:", photo);
  }, [photo]);

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log("1. Picked URI:", uri);
      setLocalPhoto(uri);

      if (isRecruiter) {
        updateFormData("companyLogo", uri);
      } else {
        updateFormData("profilePhoto", uri);
      }

      try {
        const result = await onboardingService.updateCandidateProfile({
          profilePhoto: uri,
        });
        console.log("2. Upload result:", result);
      } catch (error) {
        console.log("3. Upload FAILED:", error.message);
      }
    }
  }

  // ── Candidate Style ──
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
          {localPhoto ? ( // ← use localPhoto not photo
            <Image
              source={{ uri: localPhoto }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
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
          <Ionicons
            name={localPhoto ? "pencil" : "camera"} // ← use localPhoto
            size={18}
            color={colors.surface}
          />
        </TouchableScale>
      </View>
    </View>
  );
}
