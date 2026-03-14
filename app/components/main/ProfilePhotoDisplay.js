import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { useProfile } from "../../context/ProfileContext";
import { onboardingService } from "../../services/OnboardingService";
import { useAppTheme } from "../../utils/theme";
import TouchableScale from "../common/TouchableScale";

export default function ProfilePhotoDisplay({
  photo,
  onPhotoChange,
  variant = "candidate",
}) {
  const { colors, isDark } = useAppTheme();
  const { profile } = useProfile();
  const [localPhoto, setLocalPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const isRecruiter = variant === "recruiter";

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || "User")}&size=200&background=475569&color=fff&bold=true`;

  useEffect(() => {
    if (photo) setLocalPhoto(photo);
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
      setLocalPhoto(uri);
      setUploading(true);

      try {
        if (isRecruiter) {
          await onboardingService.updateRecruiterProfile({ profilePhoto: uri });
        } else {
          await onboardingService.updateCandidateProfile({ profilePhoto: uri });
        }
        onPhotoChange?.(uri);
      } catch (error) {
        console.log("Upload failed:", error.message);
      } finally {
        setUploading(false);
      }
    }
  }

  return (
    <View className="items-center">
      <View className="relative">
        {/* Photo Circle */}
        <View
          className="h-36 w-36 items-center justify-center rounded-full overflow-hidden"
          style={{
            backgroundColor: isDark ? colors.neutral700 : colors.neutral200,
            borderWidth: 4,
            borderColor: colors.surface,
          }}
        >
          <Image
            source={{ uri: localPhoto || avatarUrl }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>

        {/* Uploading overlay */}
        {uploading && (
          <View
            style={{
              position: "absolute",
              width: 144,
              height: 144,
              borderRadius: 72,
              backgroundColor: "rgba(0,0,0,0.45)",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}

        {/* Edit Button */}
        <TouchableScale
          onPress={handlePickImage}
          disabled={uploading}
          className="h-12 w-10 items-center justify-center rounded-full absolute bottom-2 right-0"
          style={{
            backgroundColor: uploading
              ? colors.neutral400
              : colors.brandPrimary,
            borderWidth: 2,
            borderColor: colors.surface,
          }}
        >
          {uploading ? (
            <ActivityIndicator size="small" color={colors.surface} />
          ) : (
            <Ionicons
              name={localPhoto ? "pencil" : "camera"}
              size={18}
              color={colors.surface}
            />
          )}
        </TouchableScale>
      </View>
    </View>
  );
}
