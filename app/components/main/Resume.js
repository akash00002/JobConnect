import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "../../utils/theme";

export default function Resume({ resume, onSave }) {
  const { colors, isDark } = useAppTheme();
  const [fileName, setFileName] = useState(null);

  useEffect(() => {
    if (resume) {
      const parts = resume.split("/");
      setFileName(decodeURIComponent(parts[parts.length - 1]));
    }
  }, [resume]);

  async function handlePickResume() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });
      if (!result.canceled) {
        const file = result.assets[0];
        setFileName(file.name);
        await onSave?.({ uri: file.uri, name: file.name });
      }
    } catch (error) {
      console.error("Failed to pick resume:", error);
    }
  }

  async function handleView() {
    if (!resume) return;
    await Linking.openURL(resume);
  }

  return (
    <View className="mt-1">
      <View className="flex-col gap-2">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold" style={{ color: colors.text }}>
            Resume
          </Text>
        </View>

        {/* Tappable Box */}
        <TouchableOpacity
          onPress={resume ? handleView : handlePickResume}
          activeOpacity={0.7}
          className="flex-row items-center gap-4 p-4 rounded-xl"
          style={{
            backgroundColor: colors.surface,
            borderWidth: 1,
            minWidth: "100%",
            borderColor: isDark ? colors.neutral700 : colors.neutral100,
          }}
        >
          {/* PDF Icon */}
          <View
            className="w-12 h-12 rounded-lg items-center justify-center"
            style={{
              backgroundColor: isDark
                ? `${colors.error}20`
                : `${colors.error}10`,
            }}
          >
            <Ionicons name="document-text" size={24} color={colors.error} />
          </View>

          {/* File info */}
          <View className="flex-1">
            <Text
              className="text-sm font-semibold"
              style={{ color: colors.text }}
              numberOfLines={1}
            >
              {fileName || "No resume uploaded"}
            </Text>
            <Text
              className="text-xs mt-0.5"
              style={{ color: colors.textSecondary }}
            >
              {resume ? "Tap to view" : "Tap to upload"}
            </Text>
          </View>

          {/* Edit icon on the right like ExperienceCard */}
          <TouchableOpacity
            onPress={handlePickResume}
            className="w-9 h-9 items-center justify-center"
          >
            <Ionicons
              name={resume ? "pencil-sharp" : "cloud-upload-outline"}
              size={20}
              color={colors.neutral500}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}
