import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import { useAppTheme } from "../../utils/theme";
import TouchableScale from "./TouchableScale";

export default function ProfilePhoto() {
  const { colors, isDark } = useAppTheme();
  const { formData, updateFormData } = useOnboarding();
  const [photo, setPhoto] = useState(formData.profilePhoto || null);

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
      setPhoto(uri);
      updateFormData("profilePhoto", uri);
    }
  }

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
