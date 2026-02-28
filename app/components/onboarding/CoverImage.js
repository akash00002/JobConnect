import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import { useAppTheme } from "../../utils/theme";
import TitleInput from "../common/TitleInput";
import TouchableScale from "../common/TouchableScale";

export default function CoverImage() {
  const { colors } = useAppTheme();
  const { formData, updateFormData } = useOnboarding();
  const [coverImage, setCoverImage] = useState(formData.coverImage || null);
  const [coverImageError, setCoverImageError] = useState("");

  async function handlePickCoverImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setCoverImageError("Permission to access gallery is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      const file = result.assets[0];
      if (file.fileSize && file.fileSize > 5 * 1024 * 1024) {
        setCoverImageError("Image size must be less than 5MB");
        return;
      }
      setCoverImageError("");
      setCoverImage(file.uri);
      updateFormData("coverImage", file.uri);
    }
  }

  function handleRemoveCoverImage() {
    setCoverImage(null);
    setCoverImageError("");
    updateFormData("coverImage", null);
  }

  return (
    <>
      <Text
        className="text-lg font-medium ml-1 mb-2"
        style={{ color: colors.text }}
      >
        Cover Image
      </Text>

      {coverImage ? (
        // ✅ No TitleInput wrapper — image renders cleanly
        <View className="mb-5" style={{ position: "relative" }}>
          <TouchableScale onPress={handlePickCoverImage}>
            <Image
              source={{ uri: coverImage }}
              style={{
                width: "100%",
                height: 180,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />
          </TouchableScale>

          {/* Delete button overlaid on image */}
          <TouchableOpacity
            onPress={handleRemoveCoverImage}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(0,0,0,0.55)",
              borderRadius: 20,
              width: 34,
              height: 34,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="trash-outline" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        // ✅ Show dashed upload box only when no image
        <TitleInput title="" variant="upload">
          <TouchableScale
            onPress={handlePickCoverImage}
            className="h-20 w-16 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.surface }}
          >
            <Ionicons name="image" size={26} color={colors.brandSecondary} />
          </TouchableScale>
          <Text className="text-xl font-normal" style={{ color: colors.text }}>
            Upload Cover Image
          </Text>
          <Text className="text-sm" style={{ color: colors.textSecondary }}>
            JPG, PNG (16:9 ratio, MAX 5MB)
          </Text>
        </TitleInput>
      )}

      {coverImageError ? (
        <View className="flex-row items-center -mt-3 mb-5 px-1">
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text className="text-xs ml-1" style={{ color: colors.error }}>
            {coverImageError}
          </Text>
        </View>
      ) : null}
    </>
  );
}
