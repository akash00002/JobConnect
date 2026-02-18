import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Text, View } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import { useAppTheme } from "../../utils/theme";
import TitleInput from "./TitleInput";
import TouchableScale from "./TouchableScale";

export default function Resume() {
  const { colors } = useAppTheme();
  const { formData, updateFormData } = useOnboarding();
  const [resume, setResume] = useState(formData.resume || null);
  const [resumeError, setResumeError] = useState("");

  async function handlePickResume() {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      const file = result.assets[0];

      if (file.size > 1 * 1024 * 1024) {
        setResumeError("File size must be less than 1MB");
        return;
      }

      setResumeError("");
      setResume(file);
      updateFormData("resume", file);
    }
  }

  function handleRemoveResume() {
    setResume(null);
    setResumeError("");
    updateFormData("resume", null);
  }

  return (
    <>
      <TitleInput title="Resume / CV" variant="upload">
        {resume ? (
          <View className="w-full px-4 gap-3">
            <View
              className="flex-row items-center gap-3 p-4 rounded-2xl w-full"
              style={{ backgroundColor: colors.surface }}
            >
              <View
                className="h-14 w-14 rounded-2xl items-center justify-center"
                style={{ backgroundColor: colors.brandPrimary + "15" }}
              >
                <Ionicons
                  name="document-text"
                  size={28}
                  color={colors.brandPrimary}
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-base font-semibold"
                  style={{ color: colors.text }}
                  numberOfLines={1}
                >
                  {resume.name}
                </Text>
                <Text
                  className="text-sm mt-1"
                  style={{ color: colors.textSecondary }}
                >
                  {resume.size ? `${(resume.size / 1024).toFixed(1)} KB` : ""}
                </Text>
              </View>
            </View>

            <TouchableScale
              onPress={handleRemoveResume}
              className="flex-row items-center justify-center gap-2"
            >
              <Ionicons name="trash-outline" size={16} color={colors.error} />
              <Text className="text-sm" style={{ color: colors.error }}>
                Remove
              </Text>
            </TouchableScale>
          </View>
        ) : (
          <>
            <TouchableScale
              onPress={handlePickResume}
              className="h-20 w-16 rounded-full items-center justify-center"
              style={{ backgroundColor: colors.surface }}
            >
              <Ionicons
                name="cloud-upload"
                size={26}
                color={colors.brandPrimary}
              />
            </TouchableScale>
            <Text
              className="text-xl font-normal"
              style={{ color: colors.text }}
            >
              Upload Resume
            </Text>
            <Text className="text-sm" style={{ color: colors.textSecondary }}>
              PDF, DOC, DOCX (MAX 1MB)
            </Text>
          </>
        )}
      </TitleInput>

      {resumeError ? (
        <View className="flex-row items-center -mt-3 px-1">
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text className="text-xs ml-1" style={{ color: colors.error }}>
            {resumeError}
          </Text>
        </View>
      ) : null}
    </>
  );
}
